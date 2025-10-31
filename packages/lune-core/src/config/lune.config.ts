import type { LunePlugin } from '@/plugin/lune.plugin';

import type { ImageProcessor } from './image-processor/image-processor';
import type { StorageProvider } from './storage/storage';

export interface LuneConfig {
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
  plugins: LunePlugin[];
}
