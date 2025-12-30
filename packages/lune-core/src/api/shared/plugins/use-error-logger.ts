import { LuneLogger } from '@lunejs/common';
import { GraphQLError } from 'graphql';
import type { Plugin } from 'graphql-yoga';
import { isAsyncIterable } from 'graphql-yoga';

import { LuneError } from '@/errors/lune.error';

export function useErrorLogger(): Plugin {
  return {
    onExecute() {
      return {
        onExecuteDone({ result }) {
          if (isAsyncIterable(result)) {
            return;
          }

          for (const error of result?.errors ?? []) {
            const original = error.originalError;

            if (original instanceof LuneError) {
              LuneLogger.error(original);
            } else if (original instanceof GraphQLError) {
              LuneLogger.error(original);
            } else if (original instanceof Error) {
              LuneLogger.error(original);
            } else {
              LuneLogger.error(error);
            }
          }
        }
      };
    }
  };
}
