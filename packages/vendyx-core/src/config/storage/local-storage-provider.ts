import { promises as fs } from 'node:fs';
import { join } from 'node:path';

import { Logger } from '@/logger';

import { StorageProvider, UploadOptions } from './storage';

const UPLOAD_DIRNAME = 'uploads';
const UPLOAD_DIR = join(process.cwd(), UPLOAD_DIRNAME);

/**
 * @description
 * Default storage provider that saves files locally to /uploads
 */
export class LocalStorageProvider implements StorageProvider {
  async upload(filepath: string, options: UploadOptions) {
    try {
      await fs.mkdir(UPLOAD_DIR, { recursive: true });

      const filename = options?.filename ?? (filepath.split('/').pop() as string);
      const destPath = join(UPLOAD_DIR, filename);

      await fs.copyFile(filepath, destPath);

      return {
        source: `/${UPLOAD_DIRNAME}/${filename}`,
        providerId: filename
      };
    } catch (error) {
      Logger.error('LocalStorageProvider.upload', error, error);

      return null;
    }
  }

  async remove(providerId: string) {
    try {
      await fs.unlink(join(UPLOAD_DIR, providerId));
      return true;
    } catch (error: unknown) {
      console.log(error);
      return false;
    }
  }
}
