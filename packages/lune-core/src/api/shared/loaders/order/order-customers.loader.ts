import DataLoader from 'dataloader';

import type { Transaction } from '@/persistence/connection';
import type { Customer, CustomerTable } from '@/persistence/entities/customer';
import { CustomerSerializer } from '@/persistence/serializers/customer.serializer';
import { Tables } from '@/persistence/tables';

export function createOrderCustomersLoader(trx: Transaction) {
  return new DataLoader<string | null, Customer | null>(async customerIds => {
    const serializer = new CustomerSerializer();
    const rows = await trx<CustomerTable>(Tables.Customer).whereIn('id', customerIds).select('*');

    const map = new Map(rows.map(r => [r.id, serializer.deserialize(r) as Customer]));
    return customerIds.map(id => (id !== null ? (map.get(id) as Customer) : null));
  });
}
