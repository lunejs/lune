import { LuneLogger } from '@lunejs/common';
import { isAsyncIterable, type Plugin } from 'graphql-yoga';

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

              LuneLogger.query(args.operationName, original?.name || error.name, duration);

              return;
            }

            const [operationName] = Object.keys(result.data ?? {});

            const [apiError] = (result.data?.[operationName] as any)?.apiErrors ?? [];

            LuneLogger.query(args.operationName, apiError ? apiError.code : 'OK', duration);
          } catch (error) {
            LuneLogger.error(error);
          }
        }
      };
    }
  };
}
