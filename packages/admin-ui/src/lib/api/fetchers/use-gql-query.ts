import { type TypedDocumentNode } from '@graphql-typed-document-node/core';
import {
  type UndefinedInitialDataOptions,
  useQuery,
  type UseQueryResult,
} from '@tanstack/react-query';

import { gqlFetcher } from './gql-fetcher';
import type { GraphQLError } from 'graphql';

/**
 * A wrapper around react-query's `useQuery` that uses graphql-request to fetch admin api.
 */
export const useGqlQuery = <R, V>(
  options: UseGqlQueryOptions<R, V>
): UseQueryResult<R, GraphQLError> => {
  return useQuery({
    ...options,
    queryKey: options.key ?? [],
    queryFn: async () => await gqlFetcher(options.document, options.variables),
  });
};

type UseGqlQueryOptions<R, V> = {
  document: TypedDocumentNode<R, V>;
  key?: string[];
  variables?: V;
} & Omit<
  UndefinedInitialDataOptions<R, GraphQLError, R, string[]>,
  'queryKey' | 'queryFn'
>;
