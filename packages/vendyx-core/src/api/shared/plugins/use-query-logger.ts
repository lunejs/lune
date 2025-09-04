import { Logger } from '@/logger';
import { Plugin } from 'graphql-yoga';

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
