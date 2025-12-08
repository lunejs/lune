import type { StorageProvider, UploadOptions, UploadReturn } from '@/config/storage/storage';

import { TestUtils } from '../test-utils';

export class TestStorageProvider implements StorageProvider {
  upload(_: string, __?: UploadOptions): Promise<UploadReturn | null> {
    return Promise.resolve({
      providerId: TestUtils.generateUUID(),
      source: `http://example.com/${TestUtils.generateUUID()}.jpg`
    });
  }

  remove(_: string): Promise<boolean> {
    return Promise.resolve(true);
  }
}
