import type { ExecutionContext } from '@/api/shared/context/types';
import type { GraphqlApiResolver } from '@/api/shared/graphql-api';
import { UseUserGuard } from '@/api/admin/guards/user.guard';
import { CommonCustomerFieldResolver } from '@/api/shared/resolvers/customer-field.resolver';
import type { QueryCustomerArgs, QueryCustomersArgs } from '@/api/shared/types/graphql';
import { ListResponse } from '@/api/shared/utils/list-response';
import { CustomerService } from '@/business/customer/customer.service';
import type { Customer } from '@/persistence/entities/customer';

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
    customers: UseUserGuard(customers),
    customer: UseUserGuard(customer)
  },
  Customer: {
    ...CommonCustomerFieldResolver,
    totalSpent: (parent: Customer, _: unknown, ctx: ExecutionContext) => {
      return ctx.loaders.customer.totalSpent.load(parent.id);
    }
  }
};
