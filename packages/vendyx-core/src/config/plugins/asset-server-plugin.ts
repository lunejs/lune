import { join } from 'node:path';

import express from 'express';

import { VendyxPlugin } from '@/plugin/vendyx.plugin';

/**
 * Asset server plugin
 *
 * @description
 * A simple plugin to serve static assets from a specified folder.
 * By default, it serves from the 'uploads' folder at the '/uploads' route.
 * You can customize the route and folder via options.
 */
export class AssetServerPlugin implements VendyxPlugin {
  private options: Required<Options>;
  name = 'AssetServerPlugin';

  constructor(options?: Options) {
    this.options = this.getOptions(options);
  }

  register(app: express.Application): void {
    app.use(
      this.options.route,
      express.static(join(process.cwd(), this.options.folder), {
        setHeaders(res) {
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        }
      })
    );
  }

  private getOptions(option?: Options): Required<Options> {
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
