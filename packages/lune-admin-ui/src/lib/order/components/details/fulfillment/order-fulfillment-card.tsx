import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@lune/ui';

import { type CommonOrderFragment, FulfillmentType } from '@/lib/api/types';

import { OrderFulfillmentAction } from './action/order-fulfillment-action';
import { OrderInStorePickupFulfillmentDetails } from './details/order-in-store-pickup-fulfillment-details';
import { OrderShippingFulfillmentDetails } from './details/order-shipping-fulfillment-details';

export const OrderFulfillmentCard = ({ order }: Props) => {
  const { fulfillment } = order;

  return (
    <Card>
      <CardHeader className="flex justify-between flex-row items-center border-b">
        <CardTitle className="flex items-center gap-2">Fulfillment</CardTitle>
        <CardAction>
          <OrderFulfillmentAction order={order} />
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
