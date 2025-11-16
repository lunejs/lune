import { type FC } from 'react';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@lune/ui';

import type { CommonZoneFragment } from '@/lib/api/types';

import { ShippingMethodForm } from '../shipping-methods-form/shipping-method-form';

export const UpdateShippingMethodButton: FC<Props> = ({ method }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="hover:underline cursor-pointer">{method.name}</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{method.name}</DialogTitle>
        </DialogHeader>
        <ShippingMethodForm methodToUpdate={method} />
      </DialogContent>
    </Dialog>
  );
};

type Props = {
  method: CommonZoneFragment['shippingMethods'][0];
};
