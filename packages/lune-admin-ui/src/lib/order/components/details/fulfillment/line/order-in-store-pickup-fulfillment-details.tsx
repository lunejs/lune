import { StoreIcon } from 'lucide-react';

import { formatDate } from '@lune/common';
import { Muted, Small } from '@lune/ui';

import type { CommonOrderFragment, InStorePickupFulfillment } from '@/lib/api/types';

export const OrderInStorePickupFulfillmentDetails = ({ fulfillment }: Props) => {
  const details = fulfillment?.details as InStorePickupFulfillment;

  return (
    <div className="flex items-center justify-between flex-wrap gap-4">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1">
          <StoreIcon size={16} />
          <Small>In store pickup</Small>
        </div>
        <Muted>{details.location.name}</Muted>
      </div>
      {details.readyAt && (
        <div className="flex flex-col items-center gap-1">
          <Small className="flex items-center">Ready at</Small>
          <Muted>{formatDate(new Date(details.readyAt))}</Muted>
        </div>
      )}
      {details.pickedUpAt && (
        <div className="flex flex-col items-center gap-1">
          <Small className="flex items-center">Picked up at</Small>
          <Muted>{formatDate(new Date(details.pickedUpAt))}</Muted>
        </div>
      )}
    </div>
  );
};

type Props = {
  fulfillment: CommonOrderFragment['fulfillment'];
};
