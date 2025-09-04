import { DefaultImageProcessor } from './image-processor/default-image-processor';
import { LocalStorageProvider } from './storage/local-storage-provider';
import { VendyxConfig } from './vendyx.config';

export const DEFAULT_VENDYX_CONFIG: VendyxConfig = {
  app: {
    port: 4000
  },
  auth: {
    jwtSecret: 'secret',
    jwtExpiresIn: 7 * 24 * 60 * 60 // 7 days
  },
  db: {
    url: 'postgres://app_user:womteC_ruqri0_punqah@localhost:5432/vendyx'
  },
  assets: {
    storageProvider: new LocalStorageProvider(),
    imageProcessor: new DefaultImageProcessor()
  }
};
