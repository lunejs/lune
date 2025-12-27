import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@lune/ui';

import type { CommonOrderFragment } from '@/lib/api/types';

import { AddFulfillmentForm } from './form/add-fulfillment-form';

export const AddFulfillmentButton = ({ order }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'outline'} size={'sm'}>
          Add fulfillment
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 py-6">
        <DialogHeader className="px-6">
          <DialogTitle>Add fulfillment</DialogTitle>
        </DialogHeader>
        <AddFulfillmentForm order={order} />
      </DialogContent>
    </Dialog>
  );
};

type Props = {
  order: CommonOrderFragment;
};
