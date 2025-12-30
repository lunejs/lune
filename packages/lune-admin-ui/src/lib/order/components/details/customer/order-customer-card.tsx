'use client';

import { type FC } from 'react';
import { Link } from 'react-router';

import { clean, formatPhoneNumber, getFullName } from '@lunejs/common';
import { Card, CardContent, CardHeader, CardTitle, Label } from '@lunejs/ui';

import type { CommonOrderFragment } from '@/lib/api/types';

export const OrderCustomerCard: FC<Props> = ({ order }) => {
  const { customer, shippingAddress } = order;

  return (
    <Card>
      <CardHeader className="flex">
        <CardTitle>Customer</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-6 text-sm">
        {customer ? (
          <div className="flex flex-col gap-2">
            <Link
              to={`/customers/${customer.id}`}
              className="font-medium text-distinct-foreground hover:underline"
            >
              {getFullName(clean(customer)) || 'Guest'}
            </Link>
            <p>{customer.email}</p>
            {customer.phoneNumber && <p>{formatPhoneNumber(clean(customer))}</p>}
          </div>
        ) : (
          <p>Guest</p>
        )}
        {shippingAddress?.streetLine1 && (
          <div className="flex flex-col gap-2">
            <Label className="text-base">Address</Label>
            <p>{shippingAddress.streetLine1}</p>
            {shippingAddress.streetLine2 && <p>{shippingAddress.streetLine2}</p>}
            <p>
              {shippingAddress.postalCode} {shippingAddress.city}, {shippingAddress.state}
            </p>
            <p>{shippingAddress.country}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

type Props = {
  order: CommonOrderFragment;
};
