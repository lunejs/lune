import { VendyxError } from '@/errors/vendyx.error';
import { Logger } from '@/logger';
import { GraphQLError } from 'graphql';
import { isAsyncIterable, Plugin } from 'graphql-yoga';

export function useErrorLogger(): Plugin {
  return {
    onExecute() {
      return {
        onExecuteDone({ result }) {
          if (isAsyncIterable(result)) {
            return;
          }

          for (const error of result.errors ?? []) {
            const original = error.originalError;

            if (original instanceof VendyxError) {
              Logger.error(original.ctx, original.message, original.metadata);
            } else if (original instanceof GraphQLError) {
              Logger.error('Graphql', original.message, original);
            } else if (original instanceof Error) {
              Logger.error('Server', original.message, original);
            }
          }
        }
      };
    }
  };
}
