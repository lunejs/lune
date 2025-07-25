import { getCookie } from '@/lib/shared/cookies';
import { CookiesKeys } from '@/lib/shared/cookies/keys';
import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { GraphQLError } from 'graphql';
import { GraphQLClient, type Variables } from 'graphql-request';

const gqlClient = new GraphQLClient(`http://localhost:4000/admin-api`);

export async function gqlFetcher<R, V>(
  document: TypedDocumentNode<R, V>,
  variables?: V
): Promise<R> {
  try {
    const userToken = getCookie(CookiesKeys.UserToken);

    gqlClient.setHeader(
      'Authorization',
      userToken ? `Bearer ${userToken}` : ''
    );

    return await gqlClient.request({
      document,
      variables: variables as Variables,
    });
  } catch (error: unknown) {
    if (error instanceof GraphQLError) {
      throw error;
    }

    throw error;
  }
}
