import DataLoader from 'dataloader';

import type { Transaction } from '@/persistence/connection/connection';
import { OrderState } from '@/persistence/entities/order';
import { Tables } from '@/persistence/tables';

export function createCustomerTotalSpentLoader(trx: Transaction) {
  return new DataLoader<string, number>(async customerIds => {
    const rows = await trx(Tables.Order)
      .select('customer_id')
      .sum('total as total')
      .whereIn('customer_id', customerIds)
      .whereNotIn('state', [OrderState.Modifying, OrderState.Canceled])
      .groupBy('customer_id');

    const map = new Map(rows.map(r => [r.customer_id, Number(r.total ?? 0)]));

    return customerIds.map(id => map.get(id) ?? 0);
  });
}
