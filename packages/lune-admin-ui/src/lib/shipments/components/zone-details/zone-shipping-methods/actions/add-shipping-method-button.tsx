import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@lunejs/ui';
import { CircleFadingPlusIcon } from 'lucide-react';

import { ShippingMethodForm } from '../shipping-methods-form/shipping-method-form';

export const AddShippingMethodButton = () => {
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
        <ShippingMethodForm />
      </DialogContent>
    </Dialog>
  );
};
