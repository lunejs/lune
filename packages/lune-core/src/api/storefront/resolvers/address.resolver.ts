import type { CurrentCustomer, ExecutionContext } from '@/api/shared/context/types';
import type { GraphqlApiResolver } from '@/api/shared/graphql-api';
import { CommonAddressFieldResolver } from '@/api/shared/resolvers/address-field.resolver';
import type {
  MutationCreateCustomerAddressArgs,
  MutationRemoveCustomerAddressArgs,
  MutationUpdateCustomerAddressArgs
} from '@/api/shared/types/graphql';
import { UseCustomerGuard } from '@/api/storefront/guards/customer.guard';
import { AddressService } from '@/business/address/address.service';

import { UseStorefrontApiKeyGuard } from '../guards/storefront-api-key.guard';

async function createCustomerAddress(
  _,
  { input }: MutationCreateCustomerAddressArgs,
  ctx: ExecutionContext
) {
  const currentCustomer = ctx.storefront?.currentCustomer as CurrentCustomer;
  const addressService = new AddressService(ctx);

  return addressService.create(currentCustomer.id, input);
}

async function updateCustomerAddress(
  _,
  { id, input }: MutationUpdateCustomerAddressArgs,
  ctx: ExecutionContext
) {
  const currentCustomer = ctx.storefront?.currentCustomer as CurrentCustomer;
  const addressService = new AddressService(ctx);

  return addressService.update(currentCustomer.id, id, input);
}

async function removeCustomerAddress(
  _,
  { id }: MutationRemoveCustomerAddressArgs,
  ctx: ExecutionContext
) {
  const addressService = new AddressService(ctx);

  return addressService.remove(id);
}

export const AddressResolver: GraphqlApiResolver = {
  Mutation: {
    createCustomerAddress: UseStorefrontApiKeyGuard(UseCustomerGuard(createCustomerAddress)),
    updateCustomerAddress: UseStorefrontApiKeyGuard(UseCustomerGuard(updateCustomerAddress)),
    removeCustomerAddress: UseStorefrontApiKeyGuard(UseCustomerGuard(removeCustomerAddress))
  },
  Address: {
    ...CommonAddressFieldResolver
  }
};
