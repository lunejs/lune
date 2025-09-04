import { isAsyncIterable, Plugin } from 'graphql-yoga';
import { ExecutionContext } from '../context/types';

export function useTransaction(): Plugin {
  return {
    onExecutionResult: p => {
      if (isAsyncIterable(p.result)) {
        return;
      }

      const context = p.context as unknown as ExecutionContext;

      if (p.result?.errors) {
        context.trx.rollback();
        return;
      }

      context.trx.commit();
    }
  };
}
