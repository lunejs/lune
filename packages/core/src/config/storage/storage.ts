/**
 * @description
 * Storage provider interface for handling file uploads and removals.
 */
export interface StorageProvider {
  upload(filepath: string, options?: UploadOptions): Promise<UploadReturn | null>;
  remove(providerId: string): Promise<boolean>;
}

export type UploadReturn = { source: string; providerId: string };
export type UploadOptions = { filename?: string; ext?: string };
