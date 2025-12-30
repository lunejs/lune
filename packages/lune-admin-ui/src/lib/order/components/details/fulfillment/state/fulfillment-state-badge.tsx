import { type FC } from 'react';
import { Badge } from '@lunejs/ui';
import { PackageCheckIcon, ShoppingBagIcon, TruckIcon } from 'lucide-react';

import { FulfillmentState } from '@/lib/api/types';

export const FulfillmentStateBadge: FC<Props> = ({ state }) => {
  if (state === FulfillmentState.Pending) {
    return <Badge variant={'outline'}>Pending</Badge>;
  }

  if (state === FulfillmentState.Shipped) {
    return (
      <Badge className="flex items-center gap-1 bg-warning/15 border-warning text-warning w-fit">
        <TruckIcon size={16} /> Shipped
      </Badge>
    );
  }

  if (state === FulfillmentState.Delivered) {
    return (
      <Badge className="flex gap-1 bg-primary/10 border-primary text-primary w-fit">
        <PackageCheckIcon size={16} /> Delivered
      </Badge>
    );
  }

  if (state === FulfillmentState.ReadyForPickup) {
    return (
      <Badge className="flex gap-1 bg-distinct/15 border-distinct text-distinct w-fit">
        <ShoppingBagIcon size={16} /> Ready for pickup
      </Badge>
    );
  }

  if (state === FulfillmentState.PickedUp) {
    return (
      <Badge className="flex gap-1 bg-primary/10 border-primary text-primary w-fit">
        <PackageCheckIcon size={16} /> Picked up
      </Badge>
    );
  }

  if (state === FulfillmentState.Canceled) {
    return (
      <Badge variant={'outline'} className="bg-muted text-muted-foreground">
        Canceled
      </Badge>
    );
  }

  return <Badge>Pending</Badge>;
};

type Props = {
  state: FulfillmentState;
};
