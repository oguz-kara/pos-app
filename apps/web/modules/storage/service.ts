/**
 * Storage Service Layer
 *
 * Pure business logic for file storage operations.
 * Handles validation, storage provider interaction, and database persistence.
 */

import { db, eq, and, desc, files, like, sql, count } from "@jetframe/db";
import { createStorageProvider } from "./factory";
import { saasConfig } from "@/saas.config";
import {
  FileTooLargeError,
  InvalidFileTypeError,
  NotFoundError,
  FileUploadError,
  FileDeleteError,
} from "@/modules/shared/errors";
import { nanoid } from "nanoid";
import type { FileRecord } from "./types";

/**
 * Upload a file to storage and save metadata to database
 */
export async function uploadFile(
  orgId: string,
  userId: string,
  file: { buffer: Buffer; name: string; type: string }
): Promise<FileRecord> {
  // Validate file size
  const maxFileSize = saasConfig.limits.upload.maxFileSize;
  if (file.buffer.length > maxFileSize) {
    throw new FileTooLargeError(maxFileSize);
  }

  // Validate file type
  const allowedTypes = saasConfig.limits.upload.allowedTypes;
  if (!allowedTypes.includes(file.type as any)) {
    throw new InvalidFileTypeError([...allowedTypes]);
  }

  // Generate unique key
  const ext = file.name.split(".").pop() || "";
  const key = `${orgId}/${nanoid()}.${ext}`;

  // Upload to storage provider
  const storage = createStorageProvider();
  let uploadResult;
  try {
    uploadResult = await storage.upload({
      file: file.buffer,
      key,
      contentType: file.type,
    });
  } catch (error) {
    throw new FileUploadError(
      error instanceof Error ? error.message : "Unknown error"
    );
  }

  // Save metadata to database
  const [record] = await db
    .insert(files)
    .values({
      organizationId: orgId,
      userId,
      key,
      filename: file.name,
      contentType: file.type,
      size: file.buffer.length,
      url: uploadResult.url,
      metadata: null,
    })
    .returning();

  return record;
}

/**
 * Delete a file from storage and database
 */
export async function deleteFile(
  orgId: string,
  fileId: string
): Promise<void> {
  // Find file record
  const file = await db.query.files.findFirst({
    where: and(eq(files.id, fileId), eq(files.organizationId, orgId)),
  });

  if (!file) {
    throw new NotFoundError("File");
  }

  // Delete from storage provider
  const storage = createStorageProvider();
  try {
    await storage.delete(file.key);
  } catch (error) {
    throw new FileDeleteError(
      error instanceof Error ? error.message : "Unknown error"
    );
  }

  // Delete from database
  await db.delete(files).where(eq(files.id, fileId));
}

/**
 * Get file metadata by ID
 */
export async function getFile(
  orgId: string,
  fileId: string
): Promise<FileRecord> {
  const file = await db.query.files.findFirst({
    where: and(eq(files.id, fileId), eq(files.organizationId, orgId)),
  });

  if (!file) {
    throw new NotFoundError("File");
  }

  return file as unknown as FileRecord;
}

/**
 * List files for an organization with pagination and search
 */
export async function listFiles(
  orgId: string,
  params?: {
    offset?: number;
    limit?: number;
    search?: string;
  }
): Promise<{
  files: FileRecord[];
  total: number;
  hasMore: boolean;
}> {
  const offset = params?.offset ?? 0;
  const limit = params?.limit ?? 20;
  const search = params?.search;

  // Build where conditions
  const conditions = [eq(files.organizationId, orgId)];

  if (search && search.trim()) {
    conditions.push(like(files.filename, `%${search.trim()}%`));
  }

  // Get total count
  const [{ value: total }] = await db
    .select({ value: count() })
    .from(files)
    .where(and(...conditions));

  // Get paginated files
  const fileList = await db.query.files.findMany({
    where: and(...conditions),
    orderBy: [desc(files.createdAt)],
    limit: limit,
    offset: offset,
  });

  return {
    files: fileList as unknown as FileRecord[],
    total: total ?? 0,
    hasMore: offset + fileList.length < (total ?? 0),
  };
}

/**
 * Get a signed URL for temporary access to a file
 */
export async function getSignedUrl(
  orgId: string,
  fileId: string,
  expiresIn = 3600
): Promise<string> {
  // Verify file exists and belongs to org
  const file = await getFile(orgId, fileId);

  // Generate signed URL
  const storage = createStorageProvider();
  return storage.getSignedUrl(file.key, expiresIn);
}

/**
 * Check for duplicate file by hash
 */
export async function checkDuplicateByHash(
  orgId: string,
  fileHash: string
): Promise<FileRecord | null> {
  const existingFile = await db.query.files.findFirst({
    where: and(eq(files.fileHash, fileHash), eq(files.organizationId, orgId)),
  });

  return (existingFile as unknown as FileRecord) || null;
}

/**
 * Generate presigned upload URL for client-side uploads
 * Creates a pending file record that will be confirmed after upload
 */
export async function generatePresignedUploadUrl(
  orgId: string,
  userId: string,
  params: {
    filename: string;
    contentType: string;
    fileHash?: string;
  }
): Promise<{
  uploadUrl: string;
  key: string;
  fileId: string;
  publicUrl: string;
  isDuplicate: boolean;
  existingFile?: FileRecord;
}> {
  // Validate content type (images only)
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!allowedTypes.includes(params.contentType)) {
    throw new InvalidFileTypeError(allowedTypes);
  }

  // Check for duplicate if hash provided
  let isDuplicate = false;
  let existingFile: FileRecord | undefined;

  if (params.fileHash) {
    const duplicate = await checkDuplicateByHash(orgId, params.fileHash);
    if (duplicate) {
      isDuplicate = true;
      existingFile = duplicate;
      // Return existing file info instead of generating new upload URL
      return {
        uploadUrl: "", // No upload needed
        key: duplicate.key,
        fileId: duplicate.id,
        publicUrl: duplicate.url,
        isDuplicate: true,
        existingFile: duplicate,
      };
    }
  }

  // Generate unique key
  const ext = params.filename.split(".").pop() || "";
  const key = `${orgId}/${nanoid()}.${ext}`;

  // Create storage provider
  const storage = createStorageProvider();
  const publicUrl = `${(storage as any)["publicUrl"] || process.env.R2_PUBLIC_URL}/${key}`;

  // Generate presigned upload URL
  const uploadUrl = await storage.getPresignedUploadUrl({
    key,
    contentType: params.contentType,
    expiresIn: 3600, // 1 hour
  });

  // Create pending file record
  const [record] = await db
    .insert(files)
    .values({
      organizationId: orgId,
      userId,
      key,
      filename: params.filename,
      contentType: params.contentType,
      size: 0, // Will be updated on confirmation
      url: publicUrl,
      fileHash: params.fileHash || null,
      metadata: { status: "pending" },
    })
    .returning();

  return {
    uploadUrl,
    key,
    fileId: record.id,
    publicUrl,
    isDuplicate: false,
  };
}

/**
 * Confirm file upload and update metadata
 * Called after client successfully uploads to presigned URL
 */
export async function confirmUpload(
  orgId: string,
  fileId: string,
  params: {
    size: number;
    metadata?: Record<string, any>;
  }
): Promise<FileRecord> {
  // Verify file exists and belongs to org
  const file = await getFile(orgId, fileId);

  // Check if file is in pending state
  const currentMetadata = (file.metadata as Record<string, any>) || {};
  if (currentMetadata.status !== "pending") {
    throw new Error("File is not in pending state");
  }

  // Update file record
  const [updatedFile] = await db
    .update(files)
    .set({
      size: params.size,
      metadata: {
        ...currentMetadata,
        ...params.metadata,
        status: "confirmed",
      },
      updatedAt: new Date(),
    })
    .where(eq(files.id, fileId))
    .returning();

  return updatedFile;
}
