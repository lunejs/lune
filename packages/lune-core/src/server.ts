import cors from 'cors';
import express from 'express';
import type { Knex } from 'knex';

import { AdminApi } from './api/admin/admin.api';
import { StorefrontApi } from './api/storefront/storefront.api';
import { UploadApi } from './api/upload/upload.api';
import { getConfig, setConfig } from './config/config';
import type { LuneConfig } from './config/lune.config';
import { JwtService } from './libs/jwt';
import { LuneLogger } from './logger/lune.logger';
import type { Database } from './persistence/connection';
import { createConnection } from './persistence/connection';

export class LuneServer {
  private app: express.Application;
  private database: Database;

  constructor(config: LuneConfig) {
    LuneLogger.setLevels(config.logger?.levels ?? ['*']);

    const pluginsConfig = this.getPluginsConfig(config);

    setConfig(pluginsConfig);

    const { auth, db } = getConfig();

    this.app = express();

    this.app.use(
      cors({
        origin: ['http://localhost:5173', 'https://admin.tusitio.com']
      })
    );

    this.database = createConnection(db.url);
    const jwtService = new JwtService({ secretKey: auth.jwtSecret, expiresIn: auth.jwtExpiresIn });

    const adminApi = new AdminApi(this.database, jwtService);
    const storefrontApi = new StorefrontApi(this.database, jwtService);

    const uploadApi = new UploadApi(this.database, jwtService);

    // this.app.use(makeKnexQueryCounter(this.database));

    this.app.use(uploadApi.router);
    this.app.use(adminApi.endpoint, adminApi.handler);
    this.app.use(storefrontApi.endpoint, storefrontApi.handler);

    this.registerPlugins();
  }

  getApp() {
    return this.app;
  }

  async start() {
    const { app, adminUIServeUrl } = getConfig();

    this.app.listen(app.port, () => {
      LuneLogger.ready(`Lune server (v0.0.1) running on port ${app.port}`);
      LuneLogger.info(`Admin UI → http://localhost:${app.port}${adminUIServeUrl}`);
      LuneLogger.info(`Admin API → http://localhost:${app.port}/admin-api`);
      LuneLogger.info(`Storefront API → http://localhost:${app.port}/storefront-api`);
    });
  }

  async teardown() {
    await this.database.destroy();
  }

  private getPluginsConfig(initialConfig: LuneConfig) {
    const plugins = initialConfig.plugins;
    let newConfig = initialConfig;

    for (const plugin of plugins) {
      if (typeof plugin.config === 'function') {
        newConfig = plugin.config(newConfig);
      }
    }

    return newConfig;
  }

  private registerPlugins() {
    const plugins = getConfig().plugins;

    for (const plugin of plugins) {
      if (typeof plugin.register === 'function') {
        plugin.register(this.app);
      }
    }
  }
}

export function makeKnexQueryCounter(knexOrDb: Knex | { knex?: Knex }) {
  const knex: Knex =
    (knexOrDb as any).knex && typeof (knexOrDb as any).knex.on === 'function'
      ? (knexOrDb as any).knex
      : (knexOrDb as Knex);

  return function queryCounterMiddleware(req, res, next) {
    let count = 0;
    const onQuery = (data: any) => {
      console.log(data.sql);
      count += 1;
    };
    const started = process.hrtime.bigint();

    knex.on('query', onQuery);

    const cleanup = () => {
      knex.off('query', onQuery);
      const elapsedMs = Number(process.hrtime.bigint() - started) / 1e6;
      // ajusta tu logger si quieres más detalle
      console.log(
        `[SQL] ${req.method} ${req.originalUrl} -> queries=${count} in ${elapsedMs.toFixed(1)}ms`
      );
    };

    res.on('finish', cleanup);
    res.on('close', cleanup);
    next();
  };
}
