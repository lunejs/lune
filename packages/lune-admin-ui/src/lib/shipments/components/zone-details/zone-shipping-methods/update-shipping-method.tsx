import { type FC } from 'react';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@lune/ui';

import type { CommonShippingHandlersFragment, CommonZoneFragment } from '@/lib/api/types';

import { ShippingMethodForm } from './shipping-methods-form/shipping-method-form';

export const UpdateShippingMethodButton: FC<Props> = ({ zone, handlers, method }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="hover:underline cursor-pointer">{method.name}</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{method.name}</DialogTitle>
        </DialogHeader>
        <ShippingMethodForm zone={zone} shippingHandlers={handlers} methodToUpdate={method} />
      </DialogContent>
    </Dialog>
  );
};

type Props = {
  zone: CommonZoneFragment;
  method: CommonZoneFragment['shippingMethods'][0];
  handlers: CommonShippingHandlersFragment[];
};
