import { join } from 'node:path';

import express from 'express';

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
  private adminUIServeUrl: string;

  constructor(options?: Options) {
    this.options = this.getOptions(options);
  }

  config(config: LuneConfig): LuneConfig {
    this.adminUIServeUrl = config.adminUIServeUrl;

    return config;
  }

  register(app: express.Application): void {
    app.use(this.adminUIServeUrl, express.static(join(process.cwd(), this.options.folder)));

    app.get('*', (req, res) => {
      res.sendFile(join(process.cwd(), this.options.folder, 'index.html'));
    });
  }

  private getOptions(option?: Options): Required<Options> {
    return {
      folder: option?.folder ?? '/client/dist'
    };
  }
}

type Options = {
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
