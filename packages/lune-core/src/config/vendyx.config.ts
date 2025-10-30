import type { VendyxPlugin } from '@/plugin/vendyx.plugin';

import type { ImageProcessor } from './image-processor/image-processor';
import type { StorageProvider } from './storage/storage';

export interface VendyxConfig {
  adminUIServeUrl: string;
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
