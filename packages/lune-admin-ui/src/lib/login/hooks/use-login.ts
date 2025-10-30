import { GENERIC_ERROR } from '@/lib/api/errors/common.errors';
import { getUserError } from '@/lib/api/errors/user.errors';
import { useGqlMutation } from '@/lib/api/fetchers/use-gql-mutation';
import { GENERATE_ACCESS_TOKEN_MUTATION } from '@/lib/api/operations/user.operations';
import type { GenerateUserAccessTokenInput, UserErrorCode } from '@/lib/api/types';
import { setCookie } from '@/shared/cookies';
import { CookiesKeys } from '@/shared/cookies/keys';
import type { ActionResult } from '@/shared/utils/result.utils';

export const useLogin = () => {
  const { mutateAsync, isPending } = useGqlMutation(GENERATE_ACCESS_TOKEN_MUTATION, getUserError);

  const login = async (
    input: GenerateUserAccessTokenInput
  ): Promise<ActionResult<UserErrorCode>> => {
    try {
      const { accessToken, error, errorCode } = await mutateAsync({ input });

      if (error) {
        return { isSuccess: false, error, errorCode };
      }

      setCookie(CookiesKeys.UserToken, accessToken as string, { expires: 7 });
      return { isSuccess: true };
    } catch (error) {
      console.error(error);
      return { isSuccess: false, error: GENERIC_ERROR };
    }
  };

  return {
    login,
    isLoading: isPending
  };
};
