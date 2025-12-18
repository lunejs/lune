import { FreeShippingDiscountHandler } from './discounts/handlers/free-shipping-discount.handler';
import { OrderPriceDiscountHandler } from './discounts/handlers/order-price-discount.handler';
import { ProductDiscountHandler } from './discounts/handlers/product-discount.handler';
import { DefaultImageProcessor } from './image-processor/default-image-processor';
import { DummyPaymentHandler } from './payment-handler/dummy-payment-handler';
import { AdminUiServerPlugin } from './plugins/admin-ui-server-plugin';
import { AssetServerPlugin } from './plugins/asset-server-plugin';
import { FlatShippingHandler } from './shipping-handler/flat-shipping-handler';
import { LocalStorageProvider } from './storage/local-storage-provider';
import { DefaultOrderCodeStrategy } from './strategies/order-code/default-order-code-strategy';
import type { LuneConfig } from './lune.config';

export const DEFAULT_LUNE_CONFIG: LuneConfig = {
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
  orders: {
    codeStrategy: new DefaultOrderCodeStrategy({ prefix: '#' })
  },
  assets: {
    storageProvider: new LocalStorageProvider('http://localhost:4000'),
    imageProcessor: new DefaultImageProcessor()
  },
  shipping: {
    handlers: [new FlatShippingHandler()]
  },
  payments: {
    handlers: [DummyPaymentHandler]
  },
  discounts: {
    handlers: [OrderPriceDiscountHandler, ProductDiscountHandler, FreeShippingDiscountHandler]
  },
  plugins: [new AssetServerPlugin(), new AdminUiServerPlugin()],
  logger: {
    levels: ['*']
  }
};
