import { type FC, type PropsWithChildren } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';

import { getCookie } from '@/shared/cookies';
import { CookiesKeys } from '@/shared/cookies/keys';

export const AuthWrapper: FC<Props> = ({ children }) => {
  const { pathname } = useLocation();

  const isAuthenticated = Boolean(getCookie(CookiesKeys.UserToken));

  if (!isAuthenticated && pathname !== '/login') {
    return <Navigate to="/login" replace />;
  }

  if (isAuthenticated && ['/login', '/'].includes(pathname)) {
    return <Navigate to="/shops" replace />;
  }

  return children ?? <Outlet />;
};

type Props = PropsWithChildren;
