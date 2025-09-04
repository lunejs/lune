import { type FC, type PropsWithChildren } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';

import { getCookie } from '@/lib/shared/cookies';
import { CookiesKeys } from '@/lib/shared/cookies/keys';

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
