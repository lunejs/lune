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
import { HelloWorldPlugin } from './plugins/hello-world/hello-world-plugin';
import { EmailPlugin, NodemailerSender } from '@lune/email-plugin';
import { PaypalPlugin } from '@lune/payments-plugin';

config();

const luneServer = new LuneServer({
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
    storageProvider: new LocalStorageProvider('http://localhost:8080'),
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
  plugins: [
    new AssetServerPlugin(),
    new AdminUiServerPlugin(),
    new HelloWorldPlugin(),
    new EmailPlugin({ devMode: true }),
    new PaypalPlugin({ clientId: '', secret: '', devMode: true }),
  ],
});

luneServer.start();
