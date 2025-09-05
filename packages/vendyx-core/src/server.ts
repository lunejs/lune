import express from 'express';

import { AdminApi } from './api/admin/admin.api';
import { UploadApi } from './api/upload/upload.api';
import { getConfig, setConfig } from './config/config';
import { VendyxConfig } from './config/vendyx.config';
import { JwtService } from './libs/jwt';
import { createConnection, Database } from './persistence/connection';
import { Logger } from './logger';

export class VendyxServer {
  private app: express.Application;
  private database: Database;

  constructor(config: VendyxConfig) {
    Logger.banner('v0.0.1');
    const pluginsConfig = this.getPluginsConfig(config);

    setConfig(pluginsConfig);

    const { auth } = getConfig();

    this.app = express();

    this.database = createConnection();
    const jwtService = new JwtService({ secretKey: auth.jwtSecret, expiresIn: auth.jwtExpiresIn });

    const adminApi = new AdminApi(this.database, jwtService);
    const uploadApi = new UploadApi(this.database, jwtService);

    this.app.use(uploadApi.router);
    this.app.use('/admin-api', adminApi.handler);

    this.registerPlugins();
  }

  getApp() {
    return this.app;
  }

  start() {
    const port = getConfig().app.port;

    this.app.listen(port, () => {
      Logger.ready('Server', `Admin API:   http://localhost:${port}/admin-api`);
      Logger.ready('Server', `Shop API:    http://localhost:${port}/shop-api`);
    });
  }

  async teardown() {
    await this.database.destroy();
  }

  private getPluginsConfig(initialConfig: VendyxConfig) {
    const plugins = initialConfig.plugins;
    let newConfig = initialConfig;

    for (const plugin of plugins) {
      const configFn = plugin.config;

      if (configFn) {
        newConfig = configFn(newConfig);
      }
    }

    return newConfig;
  }

  private registerPlugins() {
    const plugins = getConfig().plugins;

    for (const plugin of plugins) {
      if (typeof plugin.register === 'function') {
        plugin.register(this.app);
        Logger.info('Plugin', `${plugin.name} initialized`);
      }
    }
  }
}
