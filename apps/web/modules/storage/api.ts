/**
 * Storage GraphQL API (Resolvers)
 *
 * Thin resolvers that delegate to the storage service layer.
 * Handles authentication and GraphQL-specific concerns only.
 */

import { builder } from "@/lib/graphql/builder";
import * as storageService from "./service";
import { NotAuthenticatedError } from "@/modules/shared/errors";
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
/**
 * DEV ONLY: Default organization and user IDs from seed data
 * This bypasses authentication to make testing easier
 * TODO: Enable proper authentication in production
 */
const DEFAULT_ORG_ID = "c9a7278c-7f73-43aa-bfc4-8c19e4458b69";
const DEFAULT_USER_ID = "11111111-1111-1111-1111-111111111111"; // Placeholder user ID

function getDevDefaults() {
  return {
    organizationId: DEFAULT_ORG_ID,
    userId: DEFAULT_USER_ID,
  };
}

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
      if (!ctx.session) throw new NotAuthenticatedError();

      return storageService.getFile(ctx.session.activeOrganizationId, id);
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
      // DEV: Use default org if no session
      const { organizationId } = ctx.session
        ? { organizationId: ctx.session.activeOrganizationId }
        : getDevDefaults();

      const result = await storageService.listFiles(organizationId);
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
      // DEV: Use default org if no session
      const { organizationId } = ctx.session
        ? { organizationId: ctx.session.activeOrganizationId }
        : getDevDefaults();

      return storageService.listFiles(organizationId, {
        offset: input?.offset,
        limit: input?.limit,
        search: input?.search,
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
      if (!ctx.session) throw new NotAuthenticatedError();

      // Convert base64 to buffer
      const buffer = Buffer.from(input.base64Data, "base64");

      return storageService.uploadFile(
        ctx.session.activeOrganizationId,
        ctx.session.userId,
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
      // DEV: Use default org if no session
      const { organizationId } = ctx.session
        ? { organizationId: ctx.session.activeOrganizationId }
        : getDevDefaults();

      await storageService.deleteFile(
        organizationId,
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
      if (!ctx.session) throw new NotAuthenticatedError();

      const url = await storageService.getSignedUrl(
        ctx.session.activeOrganizationId,
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
      // DEV: Use default org/user if no session
      const { organizationId, userId } = ctx.session
        ? { organizationId: ctx.session.activeOrganizationId, userId: ctx.session.userId }
        : getDevDefaults();

      const result = await storageService.generatePresignedUploadUrl(
        organizationId,
        userId,
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
      // DEV: Use default org/user if no session
      const { organizationId } = ctx.session
        ? { organizationId: ctx.session.activeOrganizationId }
        : getDevDefaults();

      return storageService.confirmUpload(
        organizationId,
        input.fileId,
        {
          size: input.size,
          metadata: input.metadata as Record<string, any> | undefined,
        }
      );
    },
  })
);
