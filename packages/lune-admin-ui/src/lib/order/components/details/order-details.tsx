import type { CommonOrderFragment } from '@/lib/api/types';
import { DetailsPageLayout } from '@/shared/components/layout/details-page-layout';

import { OrderActions } from './actions/order-actions';
import { OrderCustomerCard } from './customer/order-customer-card';
import { OrderFulfillmentCard } from './fulfillment/order-fulfillment-card';
import { OrderItemsTable } from './items/order-items-table';
import { OrderPaymentCard } from './payments/order-payment-card';

export const OrderDetails = ({ order }: Props) => {
  return (
    <DetailsPageLayout>
      <DetailsPageLayout.Header>
        <DetailsPageLayout.Title>{order.code}</DetailsPageLayout.Title>
        <DetailsPageLayout.Actions>
          <OrderActions />
        </DetailsPageLayout.Actions>
      </DetailsPageLayout.Header>

      <DetailsPageLayout.Content>
        <div className="col-span-4 flex flex-col gap-6">
          <OrderItemsTable order={order} />
          <OrderFulfillmentCard order={order} />
          <OrderPaymentCard payments={order.payments} />
        </div>
        <div className="col-span-2">
          <OrderCustomerCard order={order} />
        </div>
      </DetailsPageLayout.Content>
    </DetailsPageLayout>
  );
};

type Props = {
  order: CommonOrderFragment;
};
