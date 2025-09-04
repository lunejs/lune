import { useNavigate } from 'react-router';

import { setCookie } from '@/lib/shared/cookies';
import { CookiesKeys } from '@/lib/shared/cookies/keys';

export const useSelectShop = () => {
  const navigate = useNavigate();

  const selectShop = (id: string) => {
    setCookie(CookiesKeys.ActiveShop, id, { expires: 30 });
    navigate('/dashboard');
  };

  return { selectShop };
};
