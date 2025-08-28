import { promises as fs } from 'node:fs';
import { join } from 'node:path';
import { StorageProvider } from './storage';

const UPLOAD_DIR = join(process.cwd(), 'uploads');

/**
 * @description
 * Default storage provider that saves files locally to /uploads
 */
export class LocalStorageProvider implements StorageProvider {
  async upload(filepath: string) {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });

    const filename = filepath.split('/').pop() as string;
    const destPath = join(UPLOAD_DIR, filename);

    await fs.copyFile(filepath, destPath);

    return {
      source: `/uploads/${filename}`,
      providerId: filename,
    };
  }

  async remove(providerId: string) {
    try {
      await fs.unlink(join(UPLOAD_DIR, providerId));
      return true;
    } catch(error: unknown) {
      console.log(error)
      return false;
    }
  }
}
