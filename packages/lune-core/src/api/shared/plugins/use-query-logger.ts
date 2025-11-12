import type { Plugin } from 'graphql-yoga';

import { LuneLogger } from '@/logger/lune.logger';

export function useQueryLogger(): Plugin {
  return {
    onExecute({ args }) {
      const operationName = args.operationName || 'Anonymous';
      const start = Date.now();

      return {
        onExecuteDone() {
          const duration = Date.now() - start;

          if (operationName === 'IntrospectionQuery') return;

          LuneLogger.debug(`${operationName}() in ${duration}ms`);
        }
      };
    }
  };
}
