import { useNavigate } from 'react-router';

import { setCookie } from '@/shared/cookies';
import { CookiesKeys } from '@/shared/cookies/keys';

export const useSelectShop = () => {
  const navigate = useNavigate();

  const selectShop = (id: string) => {
    setCookie(CookiesKeys.ActiveShop, id, { expires: 30 });
    navigate('/dashboard');
  };

  return { selectShop };
};
