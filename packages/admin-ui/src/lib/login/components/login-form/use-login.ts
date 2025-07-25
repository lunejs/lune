import { useNavigate } from 'react-router';

import { notification } from '@vendyx/ui';

import { GENERIC_ERROR } from '@/lib/api/errors/common.errors';
import { getUserError } from '@/lib/api/errors/user.errors';
import { useGqlMutation } from '@/lib/api/fetchers/use-gql-mutation';
import { GENERATE_ACCESS_TOKEN_MUTATION } from '@/lib/api/operations/user.operations';
import type { GenerateUserAccessTokenInput } from '@/lib/api/types';

import { setCookie } from '@/lib/shared/cookies';
import { CookiesKeys } from '@/lib/shared/cookies/keys';

export const useLogin = () => {
  const { mutateAsync, isPending } = useGqlMutation(GENERATE_ACCESS_TOKEN_MUTATION, getUserError);

  const navigate = useNavigate();

  const login = async (input: GenerateUserAccessTokenInput) => {
    try {
      const { accessToken, error } = await mutateAsync({ input });

      if (error) {
        notification.error(error);
        return;
      }

      setCookie(CookiesKeys.UserToken, accessToken as string, { expires: 7 });
      navigate('/');
    } catch (error) {
      console.error(error);
      notification.error(GENERIC_ERROR);
    }
  };

  return {
    login,
    isLoading: isPending
  };
};
