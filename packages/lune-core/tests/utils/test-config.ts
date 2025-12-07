import type { LuneConfig } from '@/config/lune.config';
import { FlatShippingHandler } from '@/config/shipping-handler/flat-shipping-handler';

import { TestImageProcessor } from './config/test-image-processor';
import { TestOrderPriceDiscountHandler } from './config/test-order-discount.handler';
import { TestOrderLineDiscountHandler } from './config/test-order-line-discount.handler';
import { TestPaymentHandler } from './config/test-payment-handler';
import { TestFulfillmentDiscountHandler } from './config/test-shipping-discount.handler';
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
    handlers: [TestPaymentHandler]
  },
  discounts: {
    handlers: [
      TestOrderPriceDiscountHandler,
      TestOrderLineDiscountHandler,
      TestFulfillmentDiscountHandler
    ]
  },
  plugins: [],
  logger: {
    levels: []
  }
};
