import { getCookie } from '@/lib/shared/cookies';
import { CookiesKeys } from '@/lib/shared/cookies/keys';

/**
 * A wrapper around the fetch API that makes rest request
 *
 * @example
 * const response = await restFetcher('/upload', {
 *   method: 'POST',
 *   body: formData
 * });
 */
export const restFetcher = async <R>(url: string, options?: RestFetcherOptions) => {
  const queryParams = options?.queryParams ? `?${options.queryParams.toString()}` : '';
  const baseUrl = `http://localhost:4000`;

  const userToken = getCookie(CookiesKeys.UserToken);
  const shopId = getCookie(CookiesKeys.ActiveShop);

  const result = await fetch(`${baseUrl}${url}${queryParams}`, {
    method: options?.method ?? 'GET',
    headers: {
      Authorization: userToken ? `Bearer ${userToken}` : '',
      x_vendyx_shop_id: shopId ?? ''
    },
    body: options?.body
  });

  return (await result.json()) as R;
};

export type RestFetcherOptions = {
  method?: 'POST' | 'GET' | 'PUT' | 'DELETE';
  body?: BodyInit;
  queryParams?: URLSearchParams;
};
