import { StoreIcon, TruckIcon } from 'lucide-react';

import { Card, CardAction, CardContent, CardHeader, CardTitle, Small } from '@lune/ui';

import {
  type CommonOrderFragment,
  DeliveryMethodType,
  FulfillmentType,
  OrderState
} from '@/lib/api/types';

import { AddFulfillmentButton } from './add/add-fulfillment-button';
import { OrderInStorePickupFulfillmentDetails } from './line/order-in-store-pickup-fulfillment-details';
import { OrderShippingFulfillmentLine } from './line/shipping/order-shipping-fulfillment-line';

export const OrderFulfillmentCard = ({ order }: Props) => {
  const { fulfillments, deliveryMethod } = order;

  return (
    <Card className="p-0 gap-0">
      <CardHeader className="flex justify-between flex-row items-center border-b pt-6">
        <CardTitle className="flex items-center gap-2">Fulfillment</CardTitle>
        <CardAction>
          {[OrderState.Placed, OrderState.PartiallyFulfilled].includes(order.state) && (
            <AddFulfillmentButton order={order} />
          )}
        </CardAction>
      </CardHeader>
      <CardContent className="p-0">
        {!fulfillments.items.length && (
          <div className="flex items-center gap-2 px-6 py-4">
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
        <div className="divide-y">
          {fulfillments.items.map((fulfillment, i) => (
            <div key={fulfillment.id} className="px-6 py-4">
              {fulfillment?.type === FulfillmentType.Shipping ? (
                <OrderShippingFulfillmentLine
                  code={`${order.code}-F${i + 1}`}
                  order={order}
                  fulfillment={fulfillment}
                />
              ) : (
                <OrderInStorePickupFulfillmentDetails
                  code={`${order.code}-F${i + 1}`}
                  order={order}
                  fulfillment={fulfillment}
                />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

type Props = {
  order: CommonOrderFragment;
};
