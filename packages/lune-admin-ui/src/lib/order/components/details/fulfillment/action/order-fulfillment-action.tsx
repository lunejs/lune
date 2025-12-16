import { Button } from '@lune/ui';

import { type CommonOrderFragment, FulfillmentType } from '@/lib/api/types';

export const OrderFulfillmentAction = ({ order }: Props) => {
  const { fulfillment } = order;

  if (fulfillment?.type === FulfillmentType.Shipping) {
    return (
      <Button variant={'outline'} size={'sm'}>
        Mark as shipped
      </Button>
    );
  }

  if (fulfillment?.type === FulfillmentType.InStorePickup) {
    return (
      <Button variant={'outline'} size={'sm'}>
        Mark as ready for pickup
      </Button>
    );
  }
};

type Props = {
  order: CommonOrderFragment;
};
