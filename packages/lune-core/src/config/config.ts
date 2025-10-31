import type { LuneConfig } from './lune.config';

let config: LuneConfig;

export const setConfig = (input?: Partial<LuneConfig>) => {
  if (!input) return;

  config = {
    ...config,
    ...input
  };
};

/**
 * Returns the current configuration.
 */
export const getConfig = () => config;
