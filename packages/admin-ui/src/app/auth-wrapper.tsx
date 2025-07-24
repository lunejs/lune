import { getCookie } from '@/lib/shared/cookies';
import { CookiesKeys } from '@/lib/shared/cookies/keys';
import { type FC, type PropsWithChildren } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';

export const AuthWrapper: FC<Props> = ({ children }) => {
  const { pathname } = useLocation();

  const isAuthenticated = Boolean(getCookie(CookiesKeys.UserToken));

  if (!isAuthenticated && pathname !== '/login') {
    return <Navigate to="/login" replace />;
  }

  if (isAuthenticated && pathname === '/login') {
    return <Navigate to="/" replace />;
  }

  return children ?? <Outlet />;
};

type Props = PropsWithChildren;
