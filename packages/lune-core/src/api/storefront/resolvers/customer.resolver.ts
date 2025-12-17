import type { ExecutionContext } from '@/api/shared/context/types';
import type { GraphqlApiResolver } from '@/api/shared/graphql-api';
import { UseCustomerGuard } from '@/api/shared/guards/customer.guard';
import type {
  MutationSignInCustomerWithCredentialsArgs,
  MutationSignUpCustomerWithCredentialsArgs,
  MutationUpdateCustomerArgs
} from '@/api/shared/types/graphql';
import { CustomerService } from '@/business/customer/customer.service';
import { isErrorResult } from '@/utils/error-result';

async function signUpCustomerWithCredentials(
  _,
  { input }: MutationSignUpCustomerWithCredentialsArgs,
  ctx: ExecutionContext
) {
  const customerService = new CustomerService(ctx);

  const result = await customerService.signUpWithCredentials(input);

  return isErrorResult(result) ? { apiErrors: [result] } : { accessToken: result, apiErrors: [] };
}

async function signInCustomerWithCredentials(
  _,
  { email, password }: MutationSignInCustomerWithCredentialsArgs,
  ctx: ExecutionContext
) {
  const customerService = new CustomerService(ctx);

  const result = await customerService.signInWithCredentials(email, password);

  return isErrorResult(result) ? { apiErrors: [result] } : { accessToken: result, apiErrors: [] };
}

async function updateCustomer(_, { input }: MutationUpdateCustomerArgs, ctx: ExecutionContext) {
  const customerService = new CustomerService(ctx);

  const result = await customerService.update(ctx.currentUser?.id as string, input);

  return isErrorResult(result) ? { apiErrors: [result] } : { customer: result, apiErrors: [] };
}

export const CustomerResolver: GraphqlApiResolver = {
  Mutation: {
    signUpCustomerWithCredentials: signUpCustomerWithCredentials,
    signInCustomerWithCredentials: signInCustomerWithCredentials,
    updateCustomer: UseCustomerGuard(updateCustomer)
  }
};
