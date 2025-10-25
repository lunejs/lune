import type { Plugin } from 'graphql-yoga';

import { Logger } from '@/logger';

export function useQueryLogger(): Plugin {
  return {
    onExecute({ args }) {
      const operationName = args.operationName || 'Anonymous';
      const start = Date.now();

      return {
        onExecuteDone() {
          const duration = Date.now() - start;

          if (operationName === 'IntrospectionQuery') return;

          Logger.graphql(`${operationName}() in ${duration}ms`);
        }
      };
    }
  };
}
