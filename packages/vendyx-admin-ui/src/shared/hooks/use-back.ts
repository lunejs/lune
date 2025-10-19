import { useLocation, useNavigate } from 'react-router';

const BACK_ROUTE_KEY = 'x-vendyx-back-route';

/**
 * Manage persisted href to back navigation
 */
export const useBack = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goto = (href: string) => {
    window.sessionStorage.setItem(BACK_ROUTE_KEY, location.pathname);

    navigate(href);
  };

  const back = () => {
    const backHref = window.sessionStorage.getItem(BACK_ROUTE_KEY);

    navigate(backHref ?? '/dashboard');
  };

  return {
    goto,
    back
  };
};
