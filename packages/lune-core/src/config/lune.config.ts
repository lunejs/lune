import type { LuneLoggerLevel } from '@/logger/lune.logger';
import type { LunePlugin } from '@/plugin/lune.plugin';

import type { FulfillmentDiscountHandler } from './discounts/fulfillment-discount-handler';
import type { OrderDiscountHandler } from './discounts/order-discount-handler';
import type { OrderLineDiscountHandler } from './discounts/order-line-discount-handler';
import type { ImageProcessor } from './image-processor/image-processor';
import type { PaymentHandler } from './payment-handler/payment-handler';
import type { ShippingHandler } from './shipping-handler/shipping-handler';
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
  shipping: {
    handlers: ShippingHandler[];
  };
  payments: {
    handlers: PaymentHandler[];
  };
  discounts: {
    handlers: (OrderDiscountHandler | OrderLineDiscountHandler | FulfillmentDiscountHandler)[];
  };
  plugins: LunePlugin[];
  logger?: {
    levels?: LuneLoggerLevel[];
  };
}
