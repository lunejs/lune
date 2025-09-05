import { StorageProvider, UploadOptions, UploadReturn } from '@/config/storage/storage';

import { TestHelper } from '../test-helper';

export class TestStorageProvider implements StorageProvider {
  upload(_: string, __?: UploadOptions): Promise<UploadReturn | null> {
    return Promise.resolve({
      providerId: TestHelper.generateUUID(),
      source: `http://example.com/${TestHelper.generateUUID()}.jpg`
    });
  }

  remove(_: string): Promise<boolean> {
    return Promise.resolve(true);
  }
}
