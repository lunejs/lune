import { GraphqlContext } from '@/api/shared/context/types';
import { MutationCreateUserArgs } from '@/api/shared/types/graphql';
import { UserService } from '@/business/user/user.service';
import { isErrorResult } from '@/utils/error-result';

async function createUser(_, { input }: MutationCreateUserArgs, ctx: GraphqlContext) {
  const userService = new UserService(ctx);

  const result = await userService.create(input);

  return isErrorResult(result) ? { apiErrors: [result] } : { user: result, apiErrors: [] };
}

export const userMutationResolver = {
  createUser
};
