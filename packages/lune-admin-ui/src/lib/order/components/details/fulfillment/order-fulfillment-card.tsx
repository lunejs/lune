import { Card, CardContent, CardHeader, CardTitle } from '@lune/ui';

import { type CommonOrderFragment, FulfillmentType } from '@/lib/api/types';

import { OrderInStorePickupFulfillmentDetails } from './details/order-in-store-pickup-fulfillment-details';
import { OrderShippingFulfillmentDetails } from './details/order-shipping-fulfillment-details';

export const OrderFulfillmentCard = ({ order }: Props) => {
  const { fulfillment } = order;

  return (
    <Card>
      <CardHeader className="flex space-y-0 border-b">
        <CardTitle className="flex items-center gap-2">Fulfillment</CardTitle>
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
