import type express from 'express';

import type { GraphqlApiResolver } from '@/api/shared/graphql-api';
import type { LuneConfig } from '@/config/lune.config';
import type { EventBus } from '@/event-bus';

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
export class LunePlugin {
  configure?: LunePluginConfig['configure'];
  register?: LunePluginConfig['register'];
  onStart?: LunePluginConfig['onStart'];
  adminApiExtension?: LunePluginConfig['adminApiExtension'];
  storefrontApiExtension?: LunePluginConfig['storefrontApiExtension'];

  constructor(config?: LunePluginConfig) {
    Object.assign(this, config);
  }
}

type LunePluginConfig = {
  /**
   * Config function
   *
   * @description
   * Runs before application bootstrap. Receives the current config and must
   * return the config to be used. Prefer returning a **new object** instead of
   * mutating the input.
   */
  configure?(config: LuneConfig): LuneConfig;

  /**
   * Register function
   *
   * @description
   * Runs after the Express app is created. Register routes, middleware,
   * webhooks, sockets, etc.
   */
  register?(app: express.Application, eventBus: EventBus): void;

  /**
   * Start function
   *
   * @description
   * Runs just after the app is served
   */
  onStart?(config: LuneConfig): void;

  /**
   * Storefront api extensions
   *
   * @description
   * storefrontApiExtensions is the way you can extend the storefront graphql api with new types and resolvers.
   */
  storefrontApiExtension?: GraphqlApiExtension;

  /**
   * Admin api extensions
   *
   * @description
   * adminApiExtensions is the way you can extend the admin graphql api with new types and resolvers.
   */
  adminApiExtension?: GraphqlApiExtension;
};

export interface GraphqlApiExtension {
  /**
   * Paths to files that contain GraphQL definitions.
   *
   * @description
   * In order to extend graphql api by referencing the files that contain the schema definitions,
   * You need to provide and absolute path where your schema files are located.
   *
   * @example
   * You should reference your file using an absolute path from the root of the project
   *
   * ```ts
   * typePaths: [path.join(process.cwd(), 'path/to/your/schema.gql')]
   * ```
   */
  typePaths: string[];
  /**
   * Resolvers that will be added to the api.
   */
  resolvers: GraphqlApiResolver[];
}
