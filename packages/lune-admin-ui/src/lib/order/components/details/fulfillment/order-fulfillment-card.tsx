import { StoreIcon, TruckIcon } from 'lucide-react';

import { Card, CardAction, CardContent, CardHeader, CardTitle, Small } from '@lune/ui';

import { type CommonOrderFragment, DeliveryMethodType, FulfillmentType } from '@/lib/api/types';

import { AddFulfillmentButton } from './add/add-fulfillment-button';
import { OrderInStorePickupFulfillmentDetails } from './details/order-in-store-pickup-fulfillment-details';
import { OrderShippingFulfillmentDetails } from './details/order-shipping-fulfillment-details';

export const OrderFulfillmentCard = ({ order }: Props) => {
  const { fulfillments, deliveryMethod } = order;

  return (
    <Card>
      <CardHeader className="flex justify-between flex-row items-center border-b">
        <CardTitle className="flex items-center gap-2">Fulfillment</CardTitle>
        <CardAction>
          <AddFulfillmentButton order={order} />
        </CardAction>
      </CardHeader>
      <CardContent>
        {!fulfillments.items.length && (
          <div className="flex items-center gap-2">
            {deliveryMethod?.type === DeliveryMethodType.Shipping ? (
              <TruckIcon size={16} />
            ) : (
              <StoreIcon size={16} />
            )}
            <Small>
              {deliveryMethod?.type === DeliveryMethodType.Shipping
                ? 'Shipping'
                : 'In store pickup'}
            </Small>
          </div>
        )}
        {fulfillments.items.map(fulfillment => (
          <>
            {fulfillment?.type === FulfillmentType.Shipping ? (
              <OrderShippingFulfillmentDetails fulfillment={fulfillment} />
            ) : (
              <OrderInStorePickupFulfillmentDetails fulfillment={fulfillment} />
            )}
          </>
        ))}
      </CardContent>
    </Card>
  );
};

type Props = {
  order: CommonOrderFragment;
};
