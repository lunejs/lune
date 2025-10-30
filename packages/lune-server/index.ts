import {
  AdminUiServerPlugin,
  AssetServerPlugin,
  DefaultImageProcessor,
  LocalStorageProvider,
  VendyxServer,
} from '@lune/core';
import { config } from 'dotenv';

config();

const vendyxServer = new VendyxServer({
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
  plugins: [new AssetServerPlugin(), new AdminUiServerPlugin()],
});

vendyxServer.start();
