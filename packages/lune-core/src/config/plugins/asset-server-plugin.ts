import { join } from 'node:path';

import express from 'express';

import { LuneLogger } from '@lune/common';

import { LunePlugin } from '@/plugin/lune.plugin';

/**
 * Asset server plugin
 *
 * @description
 * A simple plugin to serve static assets from a specified folder.
 * By default, it serves from the 'uploads' folder at the '/uploads' route.
 * You can customize the route and folder via options.
 */
export class AssetServerPlugin extends LunePlugin {
  constructor(options?: Options) {
    const { folder, route } = AssetServerPlugin.getOptions(options);

    super({
      register(app) {
        app.use(
          route,
          express.static(join(process.cwd(), folder), {
            setHeaders(res) {
              res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
            }
          })
        );

        LuneLogger.info(`asset server ready at ${route}`);
      }
    });
  }

  private static getOptions(option?: Options): Required<Options> {
    return {
      route: option?.route ?? '/uploads',
      folder: option?.folder ?? 'uploads'
    };
  }
}

type Options = {
  route?: string;
  folder?: string;
};
