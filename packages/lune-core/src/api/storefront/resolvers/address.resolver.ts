import type { CurrentCustomer, ExecutionContext } from '@/api/shared/context/types';
import type { GraphqlApiResolver } from '@/api/shared/graphql-api';
import { UseCustomerGuard } from '@/api/shared/guards/customer.guard';
import { CommonAddressFieldResolver } from '@/api/shared/resolvers/address-field.resolver';
import type {
  MutationCreateCustomerAddressArgs,
  MutationRemoveCustomerAddressArgs,
  MutationUpdateCustomerAddressArgs
} from '@/api/shared/types/graphql';
import { AddressService } from '@/business/address/address.service';

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
    createCustomerAddress: UseCustomerGuard(createCustomerAddress),
    updateCustomerAddress: UseCustomerGuard(updateCustomerAddress),
    removeCustomerAddress: UseCustomerGuard(removeCustomerAddress)
  },
  Address: {
    ...CommonAddressFieldResolver
  }
};
