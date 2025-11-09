import { DefaultImageProcessor } from './image-processor/default-image-processor';
import { TestPaymentHandler } from './payment-handler/test-payment-handler';
import { AssetServerPlugin } from './plugins/asset-server-plugin';
import { FlatShippingHandler } from './shipping-handler/flat-shipping-handler';
import { LocalStorageProvider } from './storage/local-storage-provider';
import type { LuneConfig } from './lune.config';

export const DEFAULT_LUNE_CONFIG: LuneConfig = {
  adminUIServeUrl: '/',
  app: {
    port: 4000
  },
  auth: {
    jwtSecret: 'secret',
    jwtExpiresIn: 7 * 24 * 60 * 60 // 7 days
  },
  db: {
    url: 'postgres://app_user:womteC_ruqri0_punqah@localhost:5432/lune'
  },
  assets: {
    storageProvider: new LocalStorageProvider('http://localhost:4000'),
    imageProcessor: new DefaultImageProcessor()
  },
  shipping: {
    handlers: [new FlatShippingHandler()]
  },
  payments: {
    handlers: [new TestPaymentHandler()]
  },
  plugins: [new AssetServerPlugin()]
};
