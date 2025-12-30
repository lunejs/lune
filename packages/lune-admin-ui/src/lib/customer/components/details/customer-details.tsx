import { clean, getFullName } from '@lunejs/common';

import type { CommonCustomerFragment } from '@/lib/api/types';
import { DetailsPageLayout } from '@/shared/components/layout/details-page-layout';

import { CustomerInfo } from './info/customer-info';
import { CustomerLatestOrder } from './lates-order/customer-latest-order';
import { CustomerPerformance } from './performance/customer-performance';

export const CustomerDetails = ({ customer }: Props) => {
  return (
    <DetailsPageLayout>
      <DetailsPageLayout.Header>
        <DetailsPageLayout.Title>{getFullName(clean(customer))}</DetailsPageLayout.Title>
        <DetailsPageLayout.Actions>
          {/* <OrderActions order={order} /> */}
        </DetailsPageLayout.Actions>
      </DetailsPageLayout.Header>

      <DetailsPageLayout.Content>
        <div className="col-span-4 flex flex-col gap-6">
          <CustomerPerformance customer={customer} />
          <CustomerLatestOrder customer={customer} />
        </div>
        <div className="col-span-2 flex flex-col gap-6">
          <CustomerInfo customer={customer} />
        </div>
      </DetailsPageLayout.Content>
    </DetailsPageLayout>
  );
};

type Props = {
  customer: CommonCustomerFragment;
};
