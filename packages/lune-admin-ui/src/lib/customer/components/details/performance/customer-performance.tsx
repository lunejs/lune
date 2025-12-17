import { LunePrice } from '@lune/common';
import { Card, CardContent, Muted, P } from '@lune/ui';

import type { CommonCustomerFragment } from '@/lib/api/types';

export const CustomerPerformance = ({ customer }: Props) => {
  return (
    <Card className="py-0">
      <CardContent>
        <div className="flex divide-x items-center">
          <div className="w-full flex flex-col py-4">
            <Muted>Total spent</Muted>
            <P>{LunePrice.format(customer.totalSpent)}</P>
          </div>
          <div className="w-full flex flex-col items-start py-4 pl-6">
            <Muted>Total orders</Muted>
            <P>{customer.orders.pageInfo.total}</P>
          </div>
        </div>
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
