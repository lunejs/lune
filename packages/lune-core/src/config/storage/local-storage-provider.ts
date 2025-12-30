import { promises as fs } from 'node:fs';
import { join } from 'node:path';

import { LuneLogger } from '@lunejs/common';

import type { StorageProvider, UploadOptions } from './storage';

const UPLOAD_DIRNAME = 'uploads';
const UPLOAD_DIR = join(process.cwd(), UPLOAD_DIRNAME);

/**
 * @description
 * Default storage provider that saves files locally to /uploads
 */
export class LocalStorageProvider implements StorageProvider {
  constructor(private readonly domain: string) {}

  async upload(filepath: string, options: UploadOptions) {
    try {
      await fs.mkdir(UPLOAD_DIR, { recursive: true });

      const filename = this.getFilename(options?.filename, filepath);
      const destPath = join(UPLOAD_DIR, filename);

      await fs.copyFile(filepath, destPath);

      return {
        source: `${this.domain}/${UPLOAD_DIRNAME}/${filename}`,
        providerId: filename
      };
    } catch (error) {
      LuneLogger.error(error);

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

  private getFilename(filename: string | undefined, filepath: string) {
    const _filename = filename ?? filepath.split('/').pop();

    return `${crypto.randomUUID()}-${_filename}`;
  }
}
