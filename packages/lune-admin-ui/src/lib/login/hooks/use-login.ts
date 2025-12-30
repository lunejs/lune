import { LuneLogger } from '@lunejs/common';

import { GENERIC_ERROR } from '@/lib/api/errors/common.errors';
import { getUserError } from '@/lib/api/errors/user.errors';
import { useGqlMutation } from '@/lib/api/fetchers/use-gql-mutation-v2';
import { GENERATE_ACCESS_TOKEN_MUTATION } from '@/lib/api/operations/user.operations';
import type { GenerateUserAccessTokenInput, UserErrorCode } from '@/lib/api/types';
import { setCookie } from '@/shared/cookies';
import { CookiesKeys } from '@/shared/cookies/keys';
import type { ActionResult } from '@/shared/utils/result.utils';

export const useLogin = () => {
  const { isPending, mutateAsync } = useGqlMutation(GENERATE_ACCESS_TOKEN_MUTATION);

  const login = async (
    input: GenerateUserAccessTokenInput
  ): Promise<ActionResult<UserErrorCode>> => {
    try {
      const { apiErrors, accessToken } = await mutateAsync({ input });

      if (apiErrors.length) {
        const { error, errorCode } = getUserError(apiErrors);

        return { isSuccess: false, error, errorCode };
      }

      setCookie(CookiesKeys.UserToken, accessToken as string, { expires: 7 });

      return { isSuccess: true };
    } catch (error) {
      LuneLogger.error(error);
      return { isSuccess: false, error: GENERIC_ERROR };
    }
  };

  return {
    login,
    isLoading: isPending
  };
};
