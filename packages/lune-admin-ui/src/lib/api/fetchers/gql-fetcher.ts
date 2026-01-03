import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { ClientError, type Variables } from 'graphql-request';

import { gqlClient } from '@/app/app';
import { getCookie, setCookie } from '@/shared/cookies';
import { CookiesKeys } from '@/shared/cookies/keys';

export async function gqlFetcher<R, V>(
  document: TypedDocumentNode<R, V>,
  variables?: V
): Promise<R> {
  try {
    const userToken = getCookie(CookiesKeys.UserToken);
    const shopId = getCookie(CookiesKeys.ActiveShop);

    gqlClient.setHeader('Authorization', userToken ? `Bearer ${userToken}` : '');
    gqlClient.setHeader('x_lune_shop_id', shopId ?? '');
    gqlClient.setHeader('x_lune_timezone', Intl.DateTimeFormat().resolvedOptions().timeZone);

    return await gqlClient.request({
      document,
      variables: variables as Variables
    });
  } catch (error: unknown) {
    if (error instanceof ClientError) {
      if (error.response.errors?.[0].extensions.code === 'UNAUTHORIZED') {
        setCookie(CookiesKeys.UserToken, '');
        window.location.href = '/login';
      }
    }

    throw error;
  }
}
