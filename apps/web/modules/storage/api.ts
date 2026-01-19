/**
 * Storage GraphQL API (Resolvers)
 *
 * Thin resolvers that delegate to the storage service layer.
 * Handles authentication and GraphQL-specific concerns only.
 *
 * Security:
 * - All resolvers require authentication via requireAuth()
 * - Multi-tenant isolation enforced via getOrgId()
 * - File access controlled by organization membership
 */

import { builder } from "@/lib/graphql/builder";
import { requireAuth, getOrgId } from "@/lib/graphql/guards";
import * as storageService from "./service";
import {
  FileType,
  SignedUrlType,
  PresignedUploadUrlType,
  UploadFileInputType,
  DeleteFileInputType,
  GetSignedUrlInputType,
  GenerateUploadUrlInputType,
  ConfirmUploadInputType,
  ListFilesInputType,
  ListFilesResponseType,
} from "./schema";

// === QUERIES ===

/**
 * Get a single file by ID
 */
builder.queryField("file", (t) =>
  t.field({
    type: FileType,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_, { id }, ctx) => {
      requireAuth(ctx);
      return storageService.getFile(getOrgId(ctx), id);
    },
  })
);

/**
 * List all files for the current organization (deprecated - use listFiles instead)
 */
builder.queryField("files", (t) =>
  t.field({
    type: [FileType],
    resolve: async (_, __, ctx) => {
      requireAuth(ctx);
      const result = await storageService.listFiles(getOrgId(ctx));
      return result.files;
    },
  })
);

/**
 * List files with pagination and search
 */
builder.queryField("listFiles", (t) =>
  t.field({
    type: ListFilesResponseType,
    args: {
      input: t.arg({ type: ListFilesInputType, required: false }),
    },
    resolve: async (_, { input }, ctx) => {
      requireAuth(ctx);
      return storageService.listFiles(getOrgId(ctx), {
        offset: input?.offset ?? undefined,
        limit: input?.limit ?? undefined,
        search: input?.search ?? undefined,
      });
    },
  })
);

// === MUTATIONS ===

/**
 * Upload a file
 * Note: In production, you'd typically use a presigned URL approach
 * or handle file uploads via multipart/form-data outside of GraphQL
 */
builder.mutationField("uploadFile", (t) =>
  t.field({
    type: FileType,
    args: {
      input: t.arg({ type: UploadFileInputType, required: true }),
    },
    resolve: async (_, { input }, ctx) => {
      const session = requireAuth(ctx);

      // Convert base64 to buffer
      const buffer = Buffer.from(input.base64Data, "base64");

      return storageService.uploadFile(
        session.activeOrganizationId,
        session.userId,
        {
          buffer,
          name: input.filename,
          type: input.contentType,
        }
      );
    },
  })
);

/**
 * Delete a file
 */
builder.mutationField("deleteFile", (t) =>
  t.field({
    type: "Boolean",
    args: {
      input: t.arg({ type: DeleteFileInputType, required: true }),
    },
    resolve: async (_, { input }, ctx) => {
      requireAuth(ctx);
      await storageService.deleteFile(
        getOrgId(ctx),
        input.fileId
      );

      return true;
    },
  })
);

/**
 * Get a signed URL for temporary file access
 */
builder.mutationField("getSignedUrl", (t) =>
  t.field({
    type: SignedUrlType,
    args: {
      input: t.arg({ type: GetSignedUrlInputType, required: true }),
    },
    resolve: async (_, { input }, ctx) => {
      requireAuth(ctx);
      const url = await storageService.getSignedUrl(
        getOrgId(ctx),
        input.fileId,
        input.expiresIn || 3600
      );

      return {
        url,
        expiresIn: input.expiresIn || 3600,
      };
    },
  })
);

/**
 * Generate presigned upload URL for client-side uploads
 * Supports duplicate detection via file hash
 */
builder.mutationField("generateUploadUrl", (t) =>
  t.field({
    type: PresignedUploadUrlType,
    args: {
      input: t.arg({ type: GenerateUploadUrlInputType, required: true }),
    },
    resolve: async (_, { input }, ctx) => {
      const session = requireAuth(ctx);

      const result = await storageService.generatePresignedUploadUrl(
        session.activeOrganizationId,
        session.userId,
        {
          filename: input.filename,
          contentType: input.contentType,
          fileHash: input.fileHash || undefined,
        }
      );

      return {
        uploadUrl: result.uploadUrl,
        key: result.key,
        fileId: result.fileId,
        publicUrl: result.publicUrl,
        isDuplicate: result.isDuplicate,
        existingFile: result.existingFile
          ? {
              id: result.existingFile.id,
              filename: result.existingFile.filename,
              url: result.existingFile.url,
            }
          : undefined,
      };
    },
  })
);

/**
 * Confirm file upload after client successfully uploads to presigned URL
 */
builder.mutationField("confirmUpload", (t) =>
  t.field({
    type: FileType,
    args: {
      input: t.arg({ type: ConfirmUploadInputType, required: true }),
    },
    resolve: async (_, { input }, ctx) => {
      requireAuth(ctx);
      return storageService.confirmUpload(
        getOrgId(ctx),
        input.fileId,
        {
          size: input.size,
          metadata: input.metadata as Record<string, any> | undefined,
        }
      );
    },
  })
);
