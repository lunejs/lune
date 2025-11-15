import { GraphQLError } from 'graphql';
import type { Plugin } from 'graphql-yoga';
import { isAsyncIterable } from 'graphql-yoga';

import { LuneError } from '@/errors/lune.error';
import { LuneLogger } from '@/logger/lune.logger';

export function useErrorLogger(): Plugin {
  return {
    onExecutionResult: p => {
      if (isAsyncIterable(p.result)) {
        return;
      }

      for (const error of p.result?.errors ?? []) {
        const original = error.originalError;

        if (original instanceof LuneError) {
          LuneLogger.error(original);
        } else if (original instanceof GraphQLError) {
          LuneLogger.error(original);
        } else if (original instanceof Error) {
          LuneLogger.error(original);
        }

        LuneLogger.error(error);
      }
    }
  };
}
