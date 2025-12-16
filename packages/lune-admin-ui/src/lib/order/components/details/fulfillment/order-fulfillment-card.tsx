import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@lune/ui';

import { type CommonOrderFragment, FulfillmentType, OrderState } from '@/lib/api/types';

import { OrderInStorePickupFulfillmentDetails } from './details/order-in-store-pickup-fulfillment-details';
import { OrderShippingFulfillmentDetails } from './details/order-shipping-fulfillment-details';
import { MarkAsDeliveredButton } from './mark-as-delivered/mark-as-delivered-button';
import { MarkAsShippedButton } from './mark-as-shipped/mark-as-shipped-button';

export const OrderFulfillmentCard = ({ order }: Props) => {
  const { fulfillment } = order;

  return (
    <Card>
      <CardHeader className="flex justify-between flex-row items-center border-b">
        <CardTitle className="flex items-center gap-2">Fulfillment</CardTitle>
        <CardAction>
          {fulfillment?.type === FulfillmentType.Shipping && order.state === OrderState.Placed && (
            <MarkAsShippedButton order={order} />
          )}
          {(order.state === OrderState.Shipped || order.state === OrderState.ReadyForPickup) && (
            <MarkAsDeliveredButton order={order} />
          )}
        </CardAction>
      </CardHeader>
      <CardContent>
        {fulfillment?.type === FulfillmentType.Shipping ? (
          <OrderShippingFulfillmentDetails fulfillment={fulfillment} />
        ) : (
          <OrderInStorePickupFulfillmentDetails fulfillment={fulfillment} />
        )}
      </CardContent>
    </Card>
  );
};

type Props = {
  order: CommonOrderFragment;
};
