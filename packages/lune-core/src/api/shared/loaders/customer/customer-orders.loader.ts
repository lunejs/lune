import type { Transaction } from '@/persistence/connection';
import type { Order } from '@/persistence/entities/order';
import { OrderFilter } from '@/persistence/filters/order.filter';
import { OrderSerializer } from '@/persistence/serializers/order.serializer';
import { Tables } from '@/persistence/tables';

import type { CustomerOrdersArgs } from '../../types/graphql';
import { loaderFactory } from '../loader-factory';

export function createCustomerOrdersLoader(trx: Transaction) {
  const serializer = new OrderSerializer();

  return loaderFactory<Order, CustomerOrdersArgs['input']>({
    async getItemsFn(keyIds, keyArgs) {
      const itemsQuery = trx
        .from({ o: Tables.Order })
        .select('o.*')
        .whereIn('o.customer_id', keyIds);

      const rows = await new OrderFilter(itemsQuery, 'o')
        .applyFilters(keyArgs?.filters ?? {})
        .applySort()
        .applyPagination(keyArgs ?? {})
        .build();

      return rows.map(r => ({
        keyId: r.customer_id as string,
        item: serializer.deserialize(r) as Order
      }));
    },
    async getCountsFn(keyIds, keyArgs) {
      const countQuery = trx
        .from({ o: Tables.Order })
        .select('o.customer_id')
        .count('* as total')
        .whereIn('o.customer_id', keyIds)
        .groupBy('o.customer_id');

      const countRows = (await new OrderFilter(countQuery, 'o')
        .applyFilters(keyArgs?.filters ?? {})
        .build()) as unknown as { customer_id: string; total: number }[];

      return countRows.map(r => ({ keyId: r.customer_id, total: r.total }));
    }
  });
}
