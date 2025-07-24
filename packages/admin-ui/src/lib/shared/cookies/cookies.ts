import Cookies from 'js-cookie';
import type { CookiesKeys } from './keys';

export const setCookie = (
  name: CookiesKeys,
  value: string,
  opts?: Cookies.CookieAttributes
) => Cookies.set(name, value, opts);

export const getCookie = (name: CookiesKeys) => Cookies.get(name);

export const removeCookie = (
  name: CookiesKeys,
  opts?: Cookies.CookieAttributes
) => Cookies.remove(name, opts);
