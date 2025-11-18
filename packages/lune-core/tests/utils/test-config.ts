import type { LuneConfig } from '@/config/lune.config';
import { TestPaymentHandler } from '@/config/payment-handler/test-payment-handler';
import { FlatShippingHandler } from '@/config/shipping-handler/flat-shipping-handler';

import { TestImageProcessor } from './config/test-image-processor';
import { TestStorageProvider } from './config/test-storage-provider';

export const TEST_LUNE_CONFIG: LuneConfig = {
  adminUIServeUrl: '/',
  app: {
    port: 4000
  },
  auth: {
    jwtSecret: 'secret',
    jwtExpiresIn: 7 * 24 * 60 * 60 // 7 days
  },
  db: {
    url: 'postgresql://app_user:womteC_ruqri0_punqah@localhost:6500/lune_test?schema=public'
  },
  assets: {
    storageProvider: new TestStorageProvider(),
    imageProcessor: new TestImageProcessor()
  },
  shipping: {
    handlers: [new FlatShippingHandler()]
  },
  payments: {
    handlers: [new TestPaymentHandler()]
  },
  discounts: {
    handlers: []
  },
  plugins: [],
  logger: {
    levels: []
  }
};
