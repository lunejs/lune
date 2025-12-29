import type { CurrentCustomer, ExecutionContext } from '@/api/shared/context/types';
import type { GraphqlApiResolver } from '@/api/shared/graphql-api';
import { UseCustomerGuard } from '@/api/shared/guards/customer.guard';
import { CommonCustomerFieldResolver } from '@/api/shared/resolvers/customer-field.resolver';
import type {
  MutationSignInCustomerWithCredentialsArgs,
  MutationSignUpCustomerWithCredentialsArgs,
  MutationUpdateCustomerArgs
} from '@/api/shared/types/graphql';
import { CustomerService } from '@/business/customer/customer.service';
import { isErrorResult } from '@/utils/error-result';

import { UseStorefrontApiKeyGuard } from '../guards/storefront-api-key.guard';

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
  const currentCustomer = ctx.storefront?.currentCustomer as CurrentCustomer;

  const customerService = new CustomerService(ctx);

  const result = await customerService.update(currentCustomer.id, input);

  return isErrorResult(result) ? { apiErrors: [result] } : { customer: result, apiErrors: [] };
}

export const CustomerResolver: GraphqlApiResolver = {
  Mutation: {
    signUpCustomerWithCredentials: UseStorefrontApiKeyGuard(signUpCustomerWithCredentials),
    signInCustomerWithCredentials: UseStorefrontApiKeyGuard(signInCustomerWithCredentials),
    updateCustomer: UseStorefrontApiKeyGuard(UseCustomerGuard(updateCustomer))
  },
  Customer: {
    ...CommonCustomerFieldResolver
  }
};
