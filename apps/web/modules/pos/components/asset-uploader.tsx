"use client";

import { useState, useCallback, useRef } from "react";
import { Upload, X, AlertCircle, CheckCircle2, Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import {
  calculateFileHash,
  validateImageFile,
  validateFileSize,
  formatFileSize,
} from "../utils/file-hash";
import {
  useGenerateUploadUrlMutation,
  useConfirmUploadMutation,
  useDeleteFileMutation,
} from "@/lib/graphql/generated";
import { toast } from "sonner";

export type UploadedFile = {
  fileId: string;
  url: string;
  filename: string;
  isDuplicate: boolean;
};

interface AssetUploaderProps {
  onUploadSuccess?: (fileId: string, filename: string) => void;
  onError?: (error: string) => void;
  disabled?: boolean;
  className?: string;
  maxFiles?: number;
  maxFileSize?: number; // in MB
}

type UploadState = "idle" | "hashing" | "uploading" | "success" | "error" | "duplicate";

const MAX_FILE_SIZE_MB = 10;
const MAX_RETRY_ATTEMPTS = 3;
const RETRY_DELAY_MS = 1000;

export function AssetUploader({
  onUploadSuccess,
  onError,
  disabled = false,
  className,
  maxFiles = 10,
  maxFileSize = MAX_FILE_SIZE_MB,
}: AssetUploaderProps) {
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [pendingFileId, setPendingFileId] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [duplicateInfo, setDuplicateInfo] = useState<{
    fileId: string;
    filename: string;
    url: string;
  } | null>(null);
  const [uploadQueue, setUploadQueue] = useState<File[]>([]);
  const [currentUploadIndex, setCurrentUploadIndex] = useState(0);
  const [totalFiles, setTotalFiles] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // GraphQL mutations
  const generateUploadUrlMutation = useGenerateUploadUrlMutation();
  const confirmUploadMutation = useConfirmUploadMutation();
  const deleteFileMutation = useDeleteFileMutation();

  // Sleep utility for retry delay
  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // Cleanup orphaned file from database
  const cleanupOrphanedFile = async (fileId: string) => {
    try {
      await deleteFileMutation.mutateAsync({
        input: { fileId },
      });
      console.log(`Cleaned up orphaned file: ${fileId}`);
    } catch (cleanupError) {
      console.error("Failed to cleanup orphaned file:", cleanupError);
    }
  };

  // Handle upload with retry logic
  const uploadFileWithRetry = async (
    file: File,
    attempt: number = 1
  ): Promise<void> => {
    try {
      // Step 1: Validate file
      setUploadState("hashing");
      setProgress(10);

      const validationResult = validateImageFile(file);
      if (!validationResult.valid) {
        throw new Error(validationResult.error || "Invalid file type");
      }

      const sizeResult = validateFileSize(file, maxFileSize);
      if (!sizeResult.valid) {
        throw new Error(sizeResult.error || "File size exceeds limit");
      }

      // Step 2: Calculate file hash
      setProgress(20);
      const fileHash = await calculateFileHash(file);
      setProgress(30);

      // Step 3: Request presigned upload URL
      const uploadUrlResult = await generateUploadUrlMutation.mutateAsync({
        input: {
          filename: file.name,
          contentType: file.type,
          fileHash,
        },
      });

      const { generateUploadUrl } = uploadUrlResult;

      if (!generateUploadUrl) {
        throw new Error('Failed to generate upload URL');
      }

      // Step 4: Check for duplicate
      if (generateUploadUrl.isDuplicate && generateUploadUrl.existingFile) {
        setDuplicateInfo({
          fileId: generateUploadUrl.existingFile.id!,
          filename: generateUploadUrl.existingFile.filename!,
          url: generateUploadUrl.existingFile.url!,
        });
        setUploadState("duplicate");
        return;
      }

      // Store the pending file ID for cleanup if upload fails
      setPendingFileId(generateUploadUrl.fileId ?? null);
      setProgress(40);

      if (!generateUploadUrl.uploadUrl) {
        throw new Error('No upload URL provided');
      }

      // Step 5: Upload to R2 using presigned URL
      setUploadState("uploading");
      const uploadResponse = await fetch(generateUploadUrl.uploadUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      if (!uploadResponse.ok) {
        throw new Error(
          `R2 upload failed: ${uploadResponse.status} ${uploadResponse.statusText}`
        );
      }

      setProgress(80);

      // Step 6: Confirm upload in database
      await confirmUploadMutation.mutateAsync({
        input: {
          fileId: generateUploadUrl.fileId!,
          size: file.size,
          metadata: {
            originalName: file.name,
            uploadedAt: new Date().toISOString(),
          },
        },
      });

      setProgress(100);
      setUploadState("success");
      setPendingFileId(null);

      // Notify parent component
      onUploadSuccess?.(generateUploadUrl.fileId!, file.name);
      toast.success(`${file.name} uploaded successfully`);

      // Auto-reset after 2 seconds
      setTimeout(() => {
        handleReset();
      }, 2000);
    } catch (err: any) {
      console.error(`Upload attempt ${attempt} failed:`, err);

      // If we have a pending file ID and upload failed, clean it up
      if (pendingFileId) {
        await cleanupOrphanedFile(pendingFileId);
        setPendingFileId(null);
      }

      // Retry logic
      if (attempt < MAX_RETRY_ATTEMPTS) {
        setRetryCount(attempt);
        const delay = RETRY_DELAY_MS * Math.pow(2, attempt - 1); // Exponential backoff
        toast.info(`Retrying upload (${attempt}/${MAX_RETRY_ATTEMPTS})...`);
        await sleep(delay);
        return uploadFileWithRetry(file, attempt + 1);
      }

      // Max retries exceeded
      setUploadState("error");
      const errorMessage =
        err.message || "Upload failed after multiple attempts. Please try again.";
      setError(errorMessage);
      onError?.(errorMessage);
      toast.error(errorMessage);
    }
  };

  // Handle multiple files
  const handleFiles = useCallback(
    async (files: File[]) => {
      if (disabled || files.length === 0) return;

      // Limit to maxFiles
      const filesToUpload = files.slice(0, maxFiles);
      setUploadQueue(filesToUpload);
      setTotalFiles(filesToUpload.length);
      setCurrentUploadIndex(0);
      setError(null);

      // Process files sequentially
      for (let i = 0; i < filesToUpload.length; i++) {
        setCurrentUploadIndex(i);
        setCurrentFile(filesToUpload[i]);
        setRetryCount(0);
        setPendingFileId(null);
        setDuplicateInfo(null);

        await uploadFileWithRetry(filesToUpload[i]);

        // Small delay between uploads
        if (i < filesToUpload.length - 1) {
          await sleep(500);
        }
      }

      // Reset queue after all uploads
      setUploadQueue([]);
      setTotalFiles(0);
      setCurrentUploadIndex(0);
    },
    [disabled, maxFiles, maxFileSize, onUploadSuccess, onError]
  );

  // Handle duplicate - use existing file
  const handleUseDuplicate = useCallback(() => {
    if (!duplicateInfo) return;

    onUploadSuccess?.(duplicateInfo.fileId, duplicateInfo.filename);
    toast.success(`Using existing file: ${duplicateInfo.filename}`);
    handleReset();
  }, [duplicateInfo, onUploadSuccess]);

  // Handle duplicate - upload anyway (new copy)
  const handleUploadAnyway = useCallback(async () => {
    if (!currentFile) return;

    setDuplicateInfo(null);
    toast.info("Uploading new copy...");

    // Re-upload without hash to create a new copy
    try {
      setUploadState("uploading");
      setProgress(30);

      const uploadUrlResult = await generateUploadUrlMutation.mutateAsync({
        input: {
          filename: currentFile.name,
          contentType: currentFile.type,
          // Don't send fileHash to avoid duplicate detection
        },
      });

      const { generateUploadUrl } = uploadUrlResult;

      if (!generateUploadUrl || !generateUploadUrl.uploadUrl || !generateUploadUrl.fileId) {
        throw new Error('Invalid upload URL response');
      }

      setPendingFileId(generateUploadUrl.fileId);
      setProgress(40);

      const uploadResponse = await fetch(generateUploadUrl.uploadUrl, {
        method: "PUT",
        body: currentFile,
        headers: {
          "Content-Type": currentFile.type,
        },
      });

      if (!uploadResponse.ok) {
        throw new Error(`R2 upload failed: ${uploadResponse.statusText}`);
      }

      setProgress(80);

      await confirmUploadMutation.mutateAsync({
        input: {
          fileId: generateUploadUrl.fileId,
          size: currentFile.size,
        },
      });

      setProgress(100);
      setUploadState("success");
      setPendingFileId(null);

      onUploadSuccess?.(generateUploadUrl.fileId, currentFile.name);
      toast.success(`${currentFile.name} uploaded successfully`);

      setTimeout(() => handleReset(), 2000);
    } catch (err: any) {
      if (pendingFileId) {
        await cleanupOrphanedFile(pendingFileId);
      }
      setUploadState("error");
      setError(err.message || "Upload failed");
      toast.error("Upload failed");
    }
  }, [currentFile, pendingFileId]);

  // Drag & Drop handlers
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (disabled || uploadState === "uploading") return;

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        handleFiles(files);
      }
    },
    [disabled, uploadState, handleFiles]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (disabled || uploadState === "uploading") return;

      const files = e.target.files;
      if (files && files.length > 0) {
        handleFiles(Array.from(files));
      }
    },
    [disabled, uploadState, handleFiles]
  );

  const handleClick = useCallback(() => {
    if (disabled || uploadState === "uploading") return;
    fileInputRef.current?.click();
  }, [disabled, uploadState]);

  const handleReset = useCallback(() => {
    setUploadState("idle");
    setCurrentFile(null);
    setProgress(0);
    setError(null);
    setRetryCount(0);
    setPendingFileId(null);
    setDuplicateInfo(null);
    setUploadQueue([]);
    setTotalFiles(0);
    setCurrentUploadIndex(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  const handleRetry = useCallback(() => {
    if (currentFile) {
      setError(null);
      setRetryCount(0);
      uploadFileWithRetry(currentFile);
    }
  }, [currentFile]);

  return (
    <div className={cn("w-full", className)}>
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={uploadState === "duplicate" ? undefined : handleClick}
        className={cn(
          "relative border-2 border-dashed rounded-lg p-8 text-center transition-all",
          uploadState === "duplicate" ? "cursor-default" : "cursor-pointer",
          dragActive && uploadState !== "duplicate" && "border-primary bg-primary/5",
          uploadState === "idle" &&
            !dragActive &&
            "border-gray-300 hover:border-gray-400",
          uploadState === "uploading" && "border-blue-500 bg-blue-50",
          uploadState === "success" && "border-green-500 bg-green-50",
          uploadState === "error" && "border-red-500 bg-red-50",
          uploadState === "duplicate" && "border-orange-500 bg-orange-50",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleChange}
          disabled={disabled || uploadState === "uploading"}
          multiple={true}
        />

        {uploadState === "idle" && (
          <div className="flex flex-col items-center gap-2">
            <Upload className="h-10 w-10 text-gray-400" />
            <div className="text-sm font-medium">
              Drag and drop an image, or click to select
            </div>
            <div className="text-xs text-muted-foreground">
              JPEG, PNG, WebP up to {maxFileSize}MB
            </div>
          </div>
        )}

        {(uploadState === "hashing" || uploadState === "uploading") && (
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
            <div className="text-sm font-medium">
              {uploadState === "hashing"
                ? "Calculating file hash..."
                : retryCount > 0
                ? `Retrying... (${retryCount}/${MAX_RETRY_ATTEMPTS})`
                : "Uploading..."}
            </div>
            {totalFiles > 1 && (
              <div className="text-sm font-medium">
                File {currentUploadIndex + 1} of {totalFiles}
              </div>
            )}
            {currentFile && (
              <div className="text-xs text-muted-foreground">
                {currentFile.name} ({formatFileSize(currentFile.size)})
              </div>
            )}
            <Progress value={progress} className="w-full max-w-xs" />
            <div className="text-xs text-muted-foreground">{progress}%</div>
          </div>
        )}

        {uploadState === "success" && (
          <div className="flex flex-col items-center gap-2">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
            <div className="text-sm font-medium text-green-700">
              Upload successful!
            </div>
            {currentFile && (
              <div className="text-xs text-muted-foreground">
                {currentFile.name}
              </div>
            )}
          </div>
        )}

        {uploadState === "duplicate" && duplicateInfo && (
          <div className="flex flex-col items-center gap-4">
            <AlertCircle className="h-10 w-10 text-orange-600" />
            <Alert variant="default" className="max-w-md text-left">
              <AlertTitle>File Already Exists</AlertTitle>
              <AlertDescription>
                A file with the same content already exists:{" "}
                <strong>{duplicateInfo.filename}</strong>
              </AlertDescription>
            </Alert>
            <div className="flex gap-2">
              <Button onClick={handleUseDuplicate} variant="default" size="sm">
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Use Existing
              </Button>
              <Button onClick={handleUploadAnyway} variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Upload Anyway
              </Button>
              <Button onClick={handleReset} variant="ghost" size="sm">
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        )}

        {uploadState === "error" && (
          <div className="flex flex-col items-center gap-3">
            <AlertCircle className="h-10 w-10 text-red-600" />
            <div className="text-sm font-medium text-red-700">Upload failed</div>
            {error && (
              <Alert variant="destructive" className="max-w-md">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="flex gap-2">
              <Button onClick={handleRetry} variant="default" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Retry Upload
              </Button>
              <Button onClick={handleReset} variant="outline" size="sm">
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
