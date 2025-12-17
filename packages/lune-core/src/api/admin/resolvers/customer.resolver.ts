import type { ExecutionContext } from '@/api/shared/context/types';
import type { GraphqlApiResolver } from '@/api/shared/graphql-api';
import type { QueryCustomerArgs, QueryCustomersArgs } from '@/api/shared/types/graphql';
import { ListResponse } from '@/api/shared/utils/list-response';
import { CustomerService } from '@/business/customer/customer.service';

async function customers(_, { input }: QueryCustomersArgs, ctx: ExecutionContext) {
  const customerService = new CustomerService(ctx);

  const [customers, count] = await Promise.all([
    customerService.find(input ?? {}),
    customerService.count(input?.filters)
  ]);

  return new ListResponse(customers, customers.length, { total: count });
}

async function customer(_, { id }: QueryCustomerArgs, ctx: ExecutionContext) {
  const customerService = new CustomerService(ctx);

  return customerService.findById(id);
}

export const CustomerResolver: GraphqlApiResolver = {
  Query: {
    customers,
    customer
  }
};
