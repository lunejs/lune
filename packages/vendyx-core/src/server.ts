import { join } from 'node:path';

import express from 'express';

import { AdminApi } from './api/admin/admin.api';
import { UploadApi } from './api/upload/upload.api';
import { getConfig, setConfig } from './config/config';
import { JwtService } from './libs/jwt';
import { createConnection, Database } from './persistence/connection';
import { VendyxConfig } from './config';
import { Logger } from './logger';

export class VendyxServer {
  private app: express.Application;
  private database: Database;

  constructor(config: VendyxConfig) {
    setConfig(config);
    const { auth } = getConfig();

    this.app = express();

    this.database = createConnection();
    const jwtService = new JwtService({ secretKey: auth.jwtSecret, expiresIn: auth.jwtExpiresIn });

    const adminApi = new AdminApi(this.database, jwtService);
    const uploadApi = new UploadApi(this.database, jwtService);

    this.app.use(uploadApi.router);

    this.app.use(
      '/uploads',
      express.static(join(process.cwd(), 'uploads'), {
        setHeaders(res) {
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        }
      })
    );

    this.app.use(adminApi.handler);
  }

  getApp() {
    return this.app;
  }

  start() {
    const port = getConfig().app.port;

    this.app.listen(port, () => {
      Logger.banner('v0.0.1');
      Logger.ready('Server', `Admin API:   http://localhost:${port}/admin-api`);
      Logger.ready('Server', `Shop API:    http://localhost:${port}/shop-api`);
    });
  }

  async teardown() {
    await this.database.destroy();
  }
}

/**
 * 1. Get set shop api in hoppscotch headers
 * 3. add static server as plugin (support plugins)
 */
