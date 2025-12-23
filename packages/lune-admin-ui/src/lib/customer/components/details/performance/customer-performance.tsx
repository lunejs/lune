import { LunePrice } from '@lune/common';

import type { CommonCustomerFragment } from '@/lib/api/types';
import { StatsCard } from '@/shared/components/stats/stats-card';

export const CustomerPerformance = ({ customer }: Props) => {
  return (
    <StatsCard
      stats={[
        { title: 'Total spend', value: LunePrice.format(customer.totalSpent) },
        { title: 'Total orders', value: customer.orders.pageInfo.total }
      ]}
    />
  );
};

type Props = {
  customer: CommonCustomerFragment;
};
