import { type FC } from 'react';
import { BookmarkIcon, PackageCheckIcon, SquareSplitVerticalIcon } from 'lucide-react';

import { Badge } from '@lune/ui';

import { OrderState } from '@/lib/api/types';

export const OrderStateBadge: FC<Props> = ({ state }) => {
  if (state === OrderState.Modifying) {
    return <Badge>Adding</Badge>;
  }

  if (state === OrderState.Placed) {
    return (
      <Badge className="flex gap-1 bg-distinct/15 border-distinct text-distinct w-fit">
        <BookmarkIcon size={16} /> Paid
      </Badge>
    );
  }

  if (state === OrderState.PartiallyFulfilled) {
    return (
      <Badge className="flex items-center gap-1 bg-warning/15 border-warning text-warning w-fit">
        <SquareSplitVerticalIcon size={16} /> Partially fulfilled
      </Badge>
    );
  }

  if (state === OrderState.Fulfilled) {
    return (
      <Badge className="flex items-center gap-1 bg-warning/15 border-warning text-warning w-fit">
        <SquareSplitVerticalIcon size={16} /> Fulfilled
      </Badge>
    );
  }

  if (state === OrderState.Completed) {
    return (
      <Badge className="flex gap-1 bg-primary/10 border-primary text-primary w-fit">
        <PackageCheckIcon size={16} /> Completed
      </Badge>
    );
  }

  if (state === OrderState.Canceled) {
    return (
      <Badge variant={'outline'} className="bg-muted text-muted-foreground">
        Canceled
      </Badge>
    );
  }

  return <Badge>Adding</Badge>;
};

type Props = {
  state: OrderState;
};
