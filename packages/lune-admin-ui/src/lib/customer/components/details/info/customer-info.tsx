import { clean, formatPhoneNumber } from '@lunejs/common';
import { Card, CardAction, CardContent, CardHeader, CardTitle, Label, Small } from '@lunejs/ui';

import type { CommonCustomerFragment } from '@/lib/api/types';

import { CustomerInfoActions } from './actions/customer-info-actions';

export const CustomerInfo = ({ customer }: Props) => {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between relative">
        <CardTitle>Customer</CardTitle>
        <CardAction className="absolute right-4 -top-2.5 h-4">
          <CustomerInfoActions />
        </CardAction>
      </CardHeader>

      <CardContent className="flex flex-col gap-6 text-sm">
        <div className="flex flex-col gap-4">
          <Label>Contact information</Label>
          <div className="flex flex-col gap-2">
            <Small className="font-medium text-distinct-foreground hover:underline">
              {customer.email}
            </Small>
            {customer.phoneNumber && <p>{formatPhoneNumber(clean(customer))}</p>}
          </div>
        </div>
        {/* {shippingAddress?.streetLine1 && (
          <div className="flex flex-col gap-2">
            <Label className="text-base">Address</Label>
            <p>{shippingAddress.streetLine1}</p>
            {shippingAddress.streetLine2 && <p>{shippingAddress.streetLine2}</p>}
            <p>
              {shippingAddress.postalCode} {shippingAddress.city}, {shippingAddress.state}
            </p>
            <p>{shippingAddress.country}</p>
          </div>
        )} */}
      </CardContent>
    </Card>
  );
};

type Props = {
  customer: CommonCustomerFragment;
};
