import { CurrentUser, GraphqlContext } from '@/api/shared/context/types';
import { UseUserGuard } from '@/api/shared/guards/user.guard';
import {
  MutationCreateUserArgs,
  MutationGenerateUserAccessTokenArgs
} from '@/api/shared/types/graphql';
import { UserService } from '@/business/user/user.service';
import { isErrorResult } from '@/utils/error-result';

async function whoami(_, __, ctx: GraphqlContext) {
  const currentUser = ctx.currentUser as CurrentUser;
  const userService = new UserService(ctx);

  const user = await userService.findById(currentUser.id);

  return user;
}

async function createUser(_, { input }: MutationCreateUserArgs, ctx: GraphqlContext) {
  const userService = new UserService(ctx);

  const result = await userService.create(input);

  return isErrorResult(result) ? { apiErrors: [result] } : { user: result, apiErrors: [] };
}

async function generateUserAccessToken(
  _,
  { input }: MutationGenerateUserAccessTokenArgs,
  ctx: GraphqlContext
) {
  const userService = new UserService(ctx);

  const result = await userService.generateAccessToken(input);

  return isErrorResult(result) ? { apiErrors: [result] } : { accessToken: result, apiErrors: [] };
}

export const userResolver = {
  Query: {
    whoami: UseUserGuard(whoami)
  },
  Mutation: {
    createUser,
    generateUserAccessToken
  }
};
