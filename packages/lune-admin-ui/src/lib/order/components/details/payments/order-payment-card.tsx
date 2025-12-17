import { formatDate, LunePrice } from '@lune/common';
import { Card, CardContent, CardHeader, CardTitle, Muted, Small } from '@lune/ui';

import { type CommonOrderFragment } from '@/lib/api/types';

import { OrderPaymentStatusBadge } from './status/order-payment-status-badge';

export const OrderPaymentCard = ({ payments }: Props) => {
  return (
    <Card className="p-0 gap-0 overflow-hidden">
      <CardHeader className="flex space-y-0 border-b pt-6">
        <CardTitle>Payments</CardTitle>
      </CardHeader>

      <CardContent className="divide-y p-0">
        {payments.map(payment => (
          <div
            key={payment.id}
            className="flex items-center justify-between hover:bg-muted/50 transition-colors p-6 flex-wrap gap-4"
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Small>{payment.method}</Small>
                <OrderPaymentStatusBadge state={payment.state} />
              </div>
              <Muted>{payment.transactionId}</Muted>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Small className="h-[22px] flex items-center">Total</Small>
              <Muted>{LunePrice.format(payment.amount)}</Muted>
            </div>
            <div>
              <Muted>{formatDate(new Date(payment.createdAt))}</Muted>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

type Props = {
  payments: CommonOrderFragment['payments'];
};
