import DataLoader from 'dataloader';

import type { Transaction } from '@/persistence/connection/connection';
import type { Payment, PaymentTable } from '@/persistence/entities/payment';
import { PaymentSerializer } from '@/persistence/serializers/payment.serializer';
import { Tables } from '@/persistence/tables';

export function createOrderPaymentsLoader(trx: Transaction) {
  return new DataLoader<string, Payment[]>(async orderIds => {
    const rows: PaymentTable[] = await trx(Tables.Payment)
      .whereIn('order_id', orderIds)
      .orderBy('created_at', 'asc');

    const serializer = new PaymentSerializer();

    const byOrderId = new Map<string, Payment[]>();
    for (const id of orderIds) byOrderId.set(id, []);

    for (const r of rows) {
      const { order_id, ...paymentCols } = r;
      const payment = serializer.deserialize(paymentCols) as Payment;
      byOrderId.get(order_id)?.push(payment);
    }

    return (orderIds as string[]).map(id => byOrderId.get(id) ?? []);
  });
}
