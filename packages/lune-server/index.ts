import {
  AdminUiServerPlugin,
  AssetServerPlugin,
  DefaultImageProcessor,
  LocalStorageProvider,
  LuneServer,
  DefaultOrderCodeStrategy,
  OrderPriceDiscountHandler,
  ProductDiscountHandler,
  FreeShippingDiscountHandler,
  FlatShippingHandler,
  DummyPaymentHandler,
} from '@lune/core';
import { config } from 'dotenv';

config();

const luneServer = new LuneServer({
  adminUIServeUrl: '/',
  app: { port: Number(process.env.PORT) ?? 8080 },
  auth: {
    jwtExpiresIn: Number(process.env.JWT_EXPIRATION) ?? 604800,
    jwtSecret: process.env.JWT_SECRET ?? 'secret',
  },
  db: {
    url: process.env.DATABASE_URL ?? '',
  },
  assets: {
    imageProcessor: new DefaultImageProcessor(),
    storageProvider: new LocalStorageProvider('http://localhost:4000'),
  },
  discounts: {
    handlers: [
      OrderPriceDiscountHandler,
      ProductDiscountHandler,
      FreeShippingDiscountHandler,
    ],
  },
  orders: {
    codeStrategy: new DefaultOrderCodeStrategy(),
  },
  shipping: {
    handlers: [new FlatShippingHandler()],
  },
  payments: {
    handlers: [DummyPaymentHandler],
  },
  logger: {
    levels: ['*'],
  },
  plugins: [new AssetServerPlugin(), new AdminUiServerPlugin()],
});

luneServer.start();
