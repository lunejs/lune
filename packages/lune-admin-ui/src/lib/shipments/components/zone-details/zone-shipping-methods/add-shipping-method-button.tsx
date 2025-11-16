import { CircleFadingPlusIcon } from 'lucide-react';

import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@lune/ui';

import type { CommonShippingHandlersFragment, CommonZoneFragment } from '@/lib/api/types';

import { ShippingMethodForm } from './shipping-methods-form/shipping-method-form';

export const AddShippingMethodButton = ({ zone, shippingHandlers }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'outline'} type="button">
          <CircleFadingPlusIcon />
          <span className="hidden lg:inline">Add Shipping methods</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add shipping method</DialogTitle>
        </DialogHeader>
        <ShippingMethodForm zone={zone} shippingHandlers={shippingHandlers} />
      </DialogContent>
    </Dialog>
  );
};

type Props = {
  zone: CommonZoneFragment;
  shippingHandlers: CommonShippingHandlersFragment[];
};
