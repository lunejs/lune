import express from 'express';
import { Logger } from './logger';
import dotenv from 'dotenv';
import { createConnection, Database } from './persistence/connection';
import { AdminApi } from './api/admin/admin.api';

export class VendyxServer {
  private app: express.Application;
  private database: Database;

  constructor() {
    Logger.banner('v0.0.1');

    dotenv.config({ path: `.env.local`, quiet: true });
    Logger.ready('Environment loaded from .env.local');

    this.app = express();

    this.database = createConnection();

    const adminApi = new AdminApi(this.database);

    this.app.use(adminApi.handler);
  }

  getApp() {
    return this.app;
  }

  start() {
    const port = process.env.PORT;

    this.app.listen(port, () => {
      Logger.ready(`Ready at http://localhost:${port}`);
    });
  }

  async teardown() {
    await this.database.destroy();
  }
}
