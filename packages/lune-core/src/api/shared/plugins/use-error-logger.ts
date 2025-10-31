import { GraphQLError } from 'graphql';
import type { Plugin } from 'graphql-yoga';
import { isAsyncIterable } from 'graphql-yoga';

import { LuneError } from '@/errors/lune.error';
import { Logger } from '@/logger';

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

            if (original instanceof LuneError) {
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
