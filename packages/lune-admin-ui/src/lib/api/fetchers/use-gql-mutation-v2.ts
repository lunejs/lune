import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import {
  useMutation,
  type UseMutationOptions,
  type UseMutationResult
} from '@tanstack/react-query';
import type { GraphQLError } from 'graphql';

import { gqlFetcher } from './gql-fetcher';

type ExtractRootField<T> = T extends Record<string, infer U> ? U : never;

/**
 * A wrapper around react-query's `useMutation` that uses graphql-request to fetch admin api.
 * Automatically extracts the root field from the GraphQL response.
 */
export const useGqlMutation = <R extends Record<string, any>, V>(
  document: TypedDocumentNode<R, V>,
  options?: UseGqlMutationOptions<R, V>
): UseMutationResult<ExtractRootField<R>, GraphQLError, V> => {
  return useMutation({
    ...options,
    mutationFn: async (variables: V) => {
      const response = await gqlFetcher(document, variables);
      const rootKey = Object.keys(response)[0] as keyof R;
      return response[rootKey] as ExtractRootField<R>;
    }
  });
};

type UseGqlMutationOptions<R, V> = Omit<
  UseMutationOptions<ExtractRootField<R>, GraphQLError, V>,
  'mutationFn'
>;
