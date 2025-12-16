import { TruckIcon } from 'lucide-react';

import { formatDate } from '@lune/common';
import { Muted, Small } from '@lune/ui';

import type { CommonOrderFragment, ShippingFulfillment } from '@/lib/api/types';

export const OrderShippingFulfillmentDetails = ({ fulfillment }: Props) => {
  const details = fulfillment?.details as ShippingFulfillment;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1">
          <TruckIcon size={16} />
          <Small>{details.method}</Small>
        </div>
        {details.trackingCode && (
          <Muted>
            {details.carrier}: {details.trackingCode}
          </Muted>
        )}
      </div>
      {details.shippedAt && (
        <div className="flex flex-col items-center gap-1">
          <Small className="flex items-center">Shipped at</Small>
          <Muted>{formatDate(new Date(details.shippedAt))}</Muted>
        </div>
      )}
      {details.deliveredAt && (
        <div className="flex flex-col items-center gap-1">
          <Small className="flex items-center">Delivered at</Small>
          <Muted>{formatDate(new Date(details.deliveredAt))}</Muted>
        </div>
      )}
    </div>
  );
};

type Props = {
  fulfillment: CommonOrderFragment['fulfillment'];
};
