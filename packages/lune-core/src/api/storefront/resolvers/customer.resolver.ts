import type { ExecutionContext } from '@/api/shared/context/types';
import type { GraphqlApiResolver } from '@/api/shared/graphql-api';
import type { MutationSignUpWithCredentialsArgs } from '@/api/shared/types/graphql';
import { CustomerService } from '@/business/customer/customer.service';
import { isErrorResult } from '@/utils/error-result';

async function signUpCustomerWithCredentials(
  _,
  { input }: MutationSignUpWithCredentialsArgs,
  ctx: ExecutionContext
) {
  const customerService = new CustomerService(ctx);

  const result = await customerService.signUpWithCredentials(input);

  return isErrorResult(result) ? { apiErrors: [result] } : { accessToken: result, apiErrors: [] };
}

export const CustomerResolver: GraphqlApiResolver = {
  Mutation: {
    signUpCustomerWithCredentials: signUpCustomerWithCredentials
  }
};
