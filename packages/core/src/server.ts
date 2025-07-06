import express from 'express';
import { Logger } from './logger';
import dotenv from 'dotenv';
import { createConnection, Database } from './persistence/connection';
import { AdminApi } from './api/admin/admin.api';
import { JwtService } from './libs/jwt';

export class VendyxServer {
  private app: express.Application;
  private database: Database;

  constructor() {
    dotenv.config({ path: `.env.local`, quiet: true });

    this.app = express();

    this.database = createConnection();
    const jwtService = new JwtService({ secretKey: process.env.JWT_SECRET ?? '' });

    const adminApi = new AdminApi(this.database, jwtService);

    this.app.use(adminApi.handler);
  }

  getApp() {
    return this.app;
  }

  start() {
    const port = process.env.PORT;

    this.app.listen(port, () => {
      Logger.banner('v0.0.1');
      Logger.ready('Server', 'Env:         .env.local');
      Logger.ready('Server', `Admin API:   http://localhost:${port}/admin-api`);
    });
  }

  async teardown() {
    await this.database.destroy();
  }
}
