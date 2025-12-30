import { formatDate, LunePrice } from '@lunejs/common';
import { Button, Card, CardContent, CardHeader, CardTitle, Muted, Small } from '@lunejs/ui';
import { Link } from 'react-router';

import type { CommonCustomerFragment } from '@/lib/api/types';
import { OrderStateBadge } from '@/lib/order/components/status/order-state-badge';
import { OrderParamFiltersKeys } from '@/lib/order/constants/param-filters-keys';

export const CustomerLatestOrder = ({ customer }: Props) => {
  const lastPlacedOrder = customer.orders.items[0];

  return (
    <Card className="pb-4">
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Last order placed</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 px-0">
        <div className="flex flex-col gap-1 px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link
                to={`/orders/${lastPlacedOrder.id}`}
                className="font-mono text-distinct-foreground hover:underline"
              >
                <Small>{lastPlacedOrder.code}</Small>
              </Link>
              <OrderStateBadge state={lastPlacedOrder.state} />
            </div>
            <Small className="font-semibold">{LunePrice.format(lastPlacedOrder.total)}</Small>
          </div>
          <div>
            <Muted>{formatDate(new Date(lastPlacedOrder.placedAt))}</Muted>
          </div>
        </div>
        <footer className="border-t pt-4 px-4 flex justify-end">
          <Link to={`/orders?${OrderParamFiltersKeys.CustomerEmail}=${customer.email}`}>
            <Button size={'sm'} variant={'outline'} className="">
              View all orders
            </Button>
          </Link>
        </footer>
      </CardContent>
    </Card>
  );
};

type Props = {
  customer: CommonCustomerFragment;
};

{
  /* <Button size={'sm'} variant={'outline'}>
            View all orders
          </Button> */
}

{
  /* <div className="flex items-center gap-4">
          <div className="w-full flex flex-col items-center">
            <p>{LunePrice.format(customer.totalSpent)}</p>
            <Muted>Total spent</Muted>
          </div>
          <Separator orientation="vertical" />
          <div className="w-full flex flex-col items-center">
            <p>{LunePrice.format(customer.totalSpent)}</p>
            <Muted>Total spent</Muted>
          </div>
        </div> */
}
