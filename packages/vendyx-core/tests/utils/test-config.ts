import { VendyxConfig } from '@/config/vendyx.config';

import { TestImageProcessor } from './config/test-image-processor';
import { TestStorageProvider } from './config/test-storage-provider';

export const TEST_VENDYX_CONFIG: VendyxConfig = {
  app: {
    port: 4000
  },
  auth: {
    jwtSecret: 'secret',
    jwtExpiresIn: 7 * 24 * 60 * 60 // 7 days
  },
  db: {
    url: 'postgresql://app_user:womteC_ruqri0_punqah@localhost:6500/vendyx_test?schema=public'
  },
  assets: {
    storageProvider: new TestStorageProvider(),
    imageProcessor: new TestImageProcessor()
  },
  plugins: []
};
