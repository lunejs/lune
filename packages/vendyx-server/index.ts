import {
  AssetServerPlugin,
  DefaultImageProcessor,
  LocalStorageProvider,
  VendyxServer,
} from '@vendyx/core';
import { config } from 'dotenv';

config();

const vendyxServer = new VendyxServer({
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
  plugins: [new AssetServerPlugin()],
});

vendyxServer.start();
