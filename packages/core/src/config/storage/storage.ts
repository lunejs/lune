/**
 * @description
 * Storage provider interface for handling file uploads and removals.
 */
export interface StorageProvider  {
  upload(filepath: string): Promise<UploadReturn | null>;
  remove(providerId: string): Promise<boolean>;
}

type UploadReturn = { source: string; providerId: string }
