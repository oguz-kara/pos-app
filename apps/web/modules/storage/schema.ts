/**
 * Storage GraphQL Schema
 *
 * Defines GraphQL types for the storage module using Pothos.
 */

import { builder } from "@/lib/graphql/builder";

/**
 * File Type
 * Represents uploaded file metadata
 */
export const FileType = builder
  .objectRef<{
    id: string;
    organizationId: string;
    userId: string;
    key: string;
    filename: string;
    contentType: string;
    size: number;
    url: string;
    fileHash: string | null;
    metadata: unknown;
    createdAt: Date;
    updatedAt: Date;
  }>("File")
  .implement({
    description: "Uploaded file metadata",
    fields: (t) => ({
      id: t.exposeID("id"),
      organizationId: t.exposeString("organizationId"),
      userId: t.exposeString("userId"),
      key: t.exposeString("key"),
      filename: t.exposeString("filename"),
      contentType: t.exposeString("contentType"),
      size: t.exposeInt("size"),
      url: t.exposeString("url"),
      fileHash: t.exposeString("fileHash", { nullable: true }),
      metadata: t.field({
        type: "JSON",
        nullable: true,
        resolve: (file) => file.metadata as any,
      }),
      createdAt: t.expose("createdAt", { type: "DateTime" }),
      updatedAt: t.expose("updatedAt", { type: "DateTime" }),
    }),
  });

/**
 * SignedUrl Type
 * Represents a temporary signed URL for file access
 */
export const SignedUrlType = builder
  .objectRef<{
    url: string;
    expiresIn: number;
  }>("SignedUrl")
  .implement({
    description: "Temporary signed URL for file access",
    fields: (t) => ({
      url: t.exposeString("url"),
      expiresIn: t.exposeInt("expiresIn"),
    }),
  });

/**
 * ExistingFile Type (for duplicate detection)
 */
const ExistingFileType = builder
  .objectRef<{
    id: string;
    filename: string;
    url: string;
  }>("ExistingFile")
  .implement({
    fields: (t) => ({
      id: t.exposeString("id"),
      filename: t.exposeString("filename"),
      url: t.exposeString("url"),
    }),
  });

/**
 * PresignedUploadUrl Type
 * Represents a presigned URL for client-side upload
 */
export const PresignedUploadUrlType = builder
  .objectRef<{
    uploadUrl: string;
    key: string;
    fileId: string;
    publicUrl: string;
    isDuplicate: boolean;
    existingFile?: {
      id: string;
      filename: string;
      url: string;
    };
  }>("PresignedUploadUrl")
  .implement({
    description: "Presigned URL for client-side file upload",
    fields: (t) => ({
      uploadUrl: t.exposeString("uploadUrl"),
      key: t.exposeString("key"),
      fileId: t.exposeString("fileId"),
      publicUrl: t.exposeString("publicUrl"),
      isDuplicate: t.exposeBoolean("isDuplicate"),
      existingFile: t.field({
        type: ExistingFileType,
        nullable: true,
        resolve: (parent) => parent.existingFile,
      }),
    }),
  });

/**
 * Input Types
 */
export const UploadFileInputType = builder.inputType("UploadFileInput", {
  fields: (t) => ({
    filename: t.string({ required: true }),
    contentType: t.string({ required: true }),
    size: t.int({ required: true }),
    // Note: In a real implementation, you'd use multipart/form-data
    // For now, we'll assume the file is uploaded separately and we just store metadata
    // Or use base64 encoding for small files
    base64Data: t.string({ required: true }),
  }),
});

export const DeleteFileInputType = builder.inputType("DeleteFileInput", {
  fields: (t) => ({
    fileId: t.string({ required: true }),
  }),
});

export const GetSignedUrlInputType = builder.inputType("GetSignedUrlInput", {
  fields: (t) => ({
    fileId: t.string({ required: true }),
    expiresIn: t.int({ required: false, defaultValue: 3600 }),
  }),
});

export const GenerateUploadUrlInputType = builder.inputType(
  "GenerateUploadUrlInput",
  {
    fields: (t) => ({
      filename: t.string({ required: true }),
      contentType: t.string({ required: true }),
      fileHash: t.string({ required: false }), // SHA-256 hash for duplicate detection
    }),
  }
);

export const ConfirmUploadInputType = builder.inputType("ConfirmUploadInput", {
  fields: (t) => ({
    fileId: t.string({ required: true }),
    size: t.int({ required: true }),
    metadata: t.field({
      type: "JSON",
      required: false,
    }),
  }),
});

/**
 * ListFiles Input Type
 * For paginated file listing with search
 */
export const ListFilesInputType = builder.inputType("ListFilesInput", {
  fields: (t) => ({
    offset: t.int({ required: false, defaultValue: 0 }),
    limit: t.int({ required: false, defaultValue: 20 }),
    search: t.string({ required: false }),
  }),
});

/**
 * ListFiles Response Type
 * Contains paginated files with metadata
 */
export const ListFilesResponseType = builder
  .objectRef<{
    files: Array<{
      id: string;
      organizationId: string;
      userId: string;
      key: string;
      filename: string;
      contentType: string;
      size: number;
      url: string;
      fileHash: string | null;
      metadata: unknown;
      createdAt: Date;
      updatedAt: Date;
    }>;
    total: number;
    hasMore: boolean;
  }>("ListFilesResponse")
  .implement({
    description: "Paginated list of files with metadata",
    fields: (t) => ({
      files: t.field({
        type: [FileType],
        resolve: (parent) => parent.files,
      }),
      total: t.exposeInt("total"),
      hasMore: t.exposeBoolean("hasMore"),
    }),
  });
