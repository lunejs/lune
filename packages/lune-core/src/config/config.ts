import type { VendyxConfig } from './vendyx.config';

let config: VendyxConfig;

export const setConfig = (input?: Partial<VendyxConfig>) => {
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
