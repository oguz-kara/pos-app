/**
 * Local File Storage Adapter (Development Only)
 *
 * Implements the StorageProvider interface using local filesystem.
 * Files are stored in the public/uploads directory.
 * DO NOT USE IN PRODUCTION - This is for development/testing only.
 */

import fs from 'fs/promises';
import path from 'path';
import type { StorageProvider } from '../interface';
import { FileUploadError, FileDeleteError } from '@/modules/shared/errors';

export class LocalAdapter implements StorageProvider {
  private uploadsDir: string;
  private publicUrl: string;

  constructor() {
    // Store files in public/uploads directory
    this.uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    this.publicUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    // Ensure uploads directory exists
    this.ensureUploadsDirExists();
  }

  private async ensureUploadsDirExists() {
    try {
      await fs.mkdir(this.uploadsDir, { recursive: true });
    } catch (error) {
      console.error('Failed to create uploads directory:', error);
    }
  }

  async upload(params: {
    file: Buffer;
    key: string;
    contentType: string;
    metadata?: Record<string, string>;
  }): Promise<{ url: string; key: string }> {
    try {
      const filePath = path.join(this.uploadsDir, params.key);
      const fileDir = path.dirname(filePath);

      // Ensure directory exists
      await fs.mkdir(fileDir, { recursive: true });

      // Write file
      await fs.writeFile(filePath, params.file);

      return {
        url: `${this.publicUrl}/uploads/${params.key}`,
        key: params.key,
      };
    } catch (error) {
      console.error('Local upload error:', error);
      throw new FileUploadError(
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }

  async delete(key: string): Promise<void> {
    try {
      const filePath = path.join(this.uploadsDir, key);
      await fs.unlink(filePath);
    } catch (error) {
      console.error('Local delete error:', error);
      throw new FileDeleteError(
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }

  async getSignedUrl(key: string, expiresIn = 3600): Promise<string> {
    // For local storage, just return the public URL
    return `${this.publicUrl}/uploads/${key}`;
  }

  async getPresignedUploadUrl(params: {
    key: string;
    contentType: string;
    expiresIn?: number;
  }): Promise<string> {
    // For local storage, we can't provide a presigned URL
    // The client will need to use a different upload method
    // For now, return a placeholder that indicates server-side upload is needed
    return `${this.publicUrl}/api/upload`;
  }

  async list(prefix: string): Promise<
    Array<{
      key: string;
      size: number;
      lastModified: Date;
    }>
  > {
    try {
      const dirPath = path.join(this.uploadsDir, prefix);
      const files = await fs.readdir(dirPath, { recursive: true });

      const fileStats = await Promise.all(
        files.map(async (file) => {
          const filePath = path.join(dirPath, file.toString());
          const stats = await fs.stat(filePath);

          if (stats.isFile()) {
            return {
              key: path.join(prefix, file.toString()),
              size: stats.size,
              lastModified: stats.mtime,
            };
          }
          return null;
        })
      );

      return fileStats.filter((stat) => stat !== null) as Array<{
        key: string;
        size: number;
        lastModified: Date;
      }>;
    } catch (error) {
      console.error('Local list error:', error);
      return [];
    }
  }

  async healthCheck(): Promise<{ healthy: boolean; message?: string }> {
    try {
      // Check if we can write to the uploads directory
      await this.ensureUploadsDirExists();
      return { healthy: true };
    } catch (error) {
      return {
        healthy: false,
        message: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}
