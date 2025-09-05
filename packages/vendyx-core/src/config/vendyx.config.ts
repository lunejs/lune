import { VendyxPlugin } from '@/plugin/vendyx.plugin';

import { ImageProcessor } from './image-processor/image-processor';
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
    imageProcessor: ImageProcessor;
  };
  plugins: VendyxPlugin[];
}
