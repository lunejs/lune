import { isAsyncIterable, type Plugin } from 'graphql-yoga';

import { LuneLogger } from '@/logger/lune.logger';

export function useQueryLogger(): Plugin {
  return {
    onExecute() {
      const start = Date.now();

      return {
        onExecuteDone({ result, args }) {
          try {
            const duration = Date.now() - start;

            if (isAsyncIterable(result)) {
              return;
            }

            if (args.operationName === 'IntrospectionQuery') return;

            if (result.errors) {
              const [error] = result.errors ?? [];
              const original = error.originalError;

              LuneLogger.debug(`${args.operationName}() in ${duration}ms: ${original.name}`);

              return;
            }

            const [operationName] = Object.keys(result.data ?? {});

            const [apiError] = (result.data?.[operationName] as any)?.apiErrors ?? [];

            LuneLogger.debug(
              `${args.operationName}() in ${duration}ms: ${apiError ? apiError.code : 'Ok'}`
            );
          } catch (error) {
            LuneLogger.error(error);
          }
        }
      };
    }
  };
}
