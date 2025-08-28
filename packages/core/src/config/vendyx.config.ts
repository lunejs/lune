import { StorageProvider } from "./contracts/storage";

export interface VendyxConfig {
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
  };
}
