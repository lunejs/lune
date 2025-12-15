import { StoreIcon, TruckIcon } from 'lucide-react';

import { formatDate } from '@lune/common';
import { Card, CardContent, CardHeader, CardTitle, Muted, Small } from '@lune/ui';

import {
  type CommonOrderFragment,
  FulfillmentType,
  type InStorePickupFulfillment,
  type ShippingFulfillment
} from '@/lib/api/types';

export const OrderFulfillmentCard = ({ fulfillment }: Props) => {
  const isShipping = fulfillment?.type === FulfillmentType.Shipping;

  const shippingDetails = fulfillment?.details as ShippingFulfillment;
  const inStorePickupDetails = fulfillment?.details as InStorePickupFulfillment;

  return (
    <Card>
      <CardHeader className="flex space-y-0 border-b">
        <CardTitle className="flex items-center gap-2">Fulfillment</CardTitle>
      </CardHeader>
      <CardContent>
        {isShipping ? (
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <TruckIcon size={16} />
                <Small>{shippingDetails.method}</Small>
              </div>
              {shippingDetails.trackingCode && (
                <Muted>
                  {shippingDetails.carrier}: {shippingDetails.trackingCode}
                </Muted>
              )}
            </div>
            {shippingDetails.shippedAt && (
              <div className="flex flex-col items-center gap-1">
                <Small className="flex items-center">Shipped at</Small>
                <Muted>{formatDate(new Date(shippingDetails.shippedAt))}</Muted>
              </div>
            )}
            {shippingDetails.deliveredAt && (
              <div className="flex flex-col items-center gap-1">
                <Small className="flex items-center">Shipped at</Small>
                <Muted>{formatDate(new Date(shippingDetails.deliveredAt))}</Muted>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <StoreIcon size={16} />
                <Small>In store pickup</Small>
              </div>
              <Muted>{inStorePickupDetails.location.name}</Muted>
            </div>
            {inStorePickupDetails.readyAt && (
              <div className="flex flex-col items-center gap-1">
                <Small className="flex items-center">Ready at</Small>
                <Muted>{formatDate(new Date(inStorePickupDetails.readyAt))}</Muted>
              </div>
            )}
            {inStorePickupDetails.pickedUpAt && (
              <div className="flex flex-col items-center gap-1">
                <Small className="flex items-center">Picked up at</Small>
                <Muted>{formatDate(new Date(inStorePickupDetails.pickedUpAt))}</Muted>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

type Props = {
  fulfillment: CommonOrderFragment['fulfillment'];
};
