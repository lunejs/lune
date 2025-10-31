import type express from 'express';

import type { LuneConfig } from '@/config/lune.config';

/**
 * Lune plugin interface
 *
 * @description
 * A plugin in Lune is a class capable to extend its functionality
 * in the way you think is necessary without changing the core.
 * Here are some examples of what you can do with a plugin:
 * - Extend the storefront/admin api for extra functionality
 * - Add new routes, middleware, etc.
 * - Inject new configuration before the server starts
 */
export interface LunePlugin {
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
  config?(config: LuneConfig): LuneConfig;

  /**
   * Register function
   *
   * @description
   * Runs after the Express app is created. Register routes, middleware,
   * webhooks, sockets, etc.
   */
  register?(app: express.Application): void;
}
