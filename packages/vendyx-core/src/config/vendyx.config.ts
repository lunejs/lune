import { DefaultImageProcessor } from './image-processor/default-image-processor';
import { StorageProvider } from './storage/storage';

export interface VendyxConfig {
  app: {
    port: number;
  };
  auth: {
    jwtSecret: string;
    jwtExpiresIn: number;
  };
  db: {
    url: string;
  };
  assets: {
    storageProvider: StorageProvider;
    imageProcessor: DefaultImageProcessor;
  };
}
