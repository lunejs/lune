import { join } from 'node:path';

import express from 'express';

import { LuneLogger } from '@/logger/lune.logger';
import type { LunePlugin } from '@/plugin/lune.plugin';

import type { LuneConfig } from '../lune.config';

/**
 * Admin UI Plugin
 *
 * @description
 * A plugin to serve admin ui app via the express server
 */
export class AdminUiServerPlugin implements LunePlugin {
  name = 'AdminUiServerPlugin';

  private options: Required<Options>;
  private appPort: number;

  constructor(options?: Options) {
    this.options = this.getOptions(options);
  }

  config(config: LuneConfig): LuneConfig {
    this.appPort = config.app.port;

    return config;
  }

  register(app: express.Application): void {
    app.use(this.options.renderPath, express.static(join(process.cwd(), this.options.folder)));

    app.get('*', (req, res) => {
      res.sendFile(join(process.cwd(), this.options.folder, 'index.html'));
    });

    LuneLogger.info(`Admin UI served on /`);
  }

  private getOptions(option?: Options): Required<Options> {
    return {
      folder: option?.folder ?? '/client/dist',
      renderPath: option?.renderPath ?? '/'
    };
  }
}

type Options = {
  /**
   * The path where your admin ui dist code will be rendered in the lune server
   *
   * @example
   * '/'
   * '/admin'
   *
   * @default
   * '/'
   */
  renderPath?: string;
  /**
   * A relative path where the build of your admin ui lives
   *
   * @example
   * '/admin-ui/dist'
   * '/frontend/dist'
   *
   * @default
   * '/client/dist'
   */
  folder?: string;
};
