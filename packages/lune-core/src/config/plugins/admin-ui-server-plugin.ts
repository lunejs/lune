import { join } from 'node:path';

import express from 'express';

import { LuneLogger } from '@/logger/lune.logger';
import { LunePlugin } from '@/plugin/lune.plugin';

/**
 * Admin UI Plugin
 *
 * @description
 * A plugin to serve admin ui app via the express server
 */
export class AdminUiServerPlugin extends LunePlugin {
  constructor(options?: Options) {
    const { folder, renderPath } = AdminUiServerPlugin.getOptions(options);

    super({
      name: 'AdminUiServerPlugin',
      register(app) {
        app.use(renderPath, express.static(join(process.cwd(), folder)));

        app.get('*', (_req, res) => {
          res.sendFile(join(process.cwd(), folder, 'index.html'));
        });
      },
      onStart(config) {
        LuneLogger.info(`Admin UI → http://localhost:${config.app.port}${renderPath}`);
      }
    });
  }

  private static getOptions(option?: Options): Required<Options> {
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
