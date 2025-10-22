import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import type { GraphQLError } from 'graphql';

import { isArray } from '@vendyx/common';

import { gqlFetcher } from './gql-fetcher';

type ExtractRootField<T> = T extends Record<string, infer U> ? U : never;

type ExtractApiError<T> = T extends { apiErrors: (infer E)[] }
  ? E extends { code: infer C; message: string }
    ? { code: C; message: string }
    : never
  : never;

/**
 * A wrapper around react-query's `useMutation` that uses graphql-request to fetch admin api.
 */
export const useGqlMutation = <R extends Record<string, any>, V>(
  document: TypedDocumentNode<R, V>,
  getErrorFn?: (error: ExtractApiError<ExtractRootField<R>>) => string
): UseMutationResult<
  Omit<
    ExtractRootField<R> & {
      error?: string;
      errorCode?: ExtractApiError<ExtractRootField<R>>['code'];
    },
    'apiErrors'
  >,
  GraphQLError,
  V
> => {
  return useMutation({
    mutationFn: async (variables: V) => {
      const response = await gqlFetcher(document, variables);
      const rootKey = Object.keys(response)[0] as keyof R;
      const result = response[rootKey] as ExtractRootField<R>;

      if (!result) throw new Error('Unexpected response format');

      if (typeof result !== 'object') return result;

      if (isArray(result)) return result;

      const { apiErrors, ...rest } = result;

      if (apiErrors?.length) {
        const rawError = apiErrors[0] as ExtractApiError<ExtractRootField<R>>;

        return {
          ...rest,
          error: getErrorFn?.(rawError),
          errorCode: (rawError as any).code
        };
      }

      return rest;
    }
  });
};
