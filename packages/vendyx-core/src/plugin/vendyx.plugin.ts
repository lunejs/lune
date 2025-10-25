import type express from 'express';

import type { VendyxConfig } from '@/config/vendyx.config';

/**
 * Vendyx plugin interface
 *
 * @description
 * A plugin in Vendyx is a class capable to extend its functionality
 * in the way you think is necessary without changing the core.
 * Here are some examples of what you can do with a plugin:
 * - Extend the storefront/admin api for extra functionality
 * - Add new routes, middleware, etc.
 * - Inject new configuration before the server starts
 */
export interface VendyxPlugin {
  /**
   * Plugin name
   *
   * @description
   * A name to identify the plugin.
   */
  name: string;
  /**
   * Config function
   *
   * @description
   * Runs before application bootstrap. Receives the current config and must
   * return the config to be used. Prefer returning a **new object** instead of
   * mutating the input.
   */
  config?(config: VendyxConfig): VendyxConfig;

  /**
   * Register function
   *
   * @description
   * Runs after the Express app is created. Register routes, middleware,
   * webhooks, sockets, etc.
   */
  register?(app: express.Application): void;
}
