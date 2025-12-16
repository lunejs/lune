import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@lune/ui';

import type { CommonOrderFragment } from '@/lib/api/types';

import { CancelOrderForm } from './form/cancel-order-form';

export const CancelOrderDialog = ({ order, isOpen, setIsOpen }: Props) => {
  return (
    <Dialog isOpen={isOpen} setIsOpen={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cancel order</DialogTitle>
        </DialogHeader>
        <CancelOrderForm order={order} />
      </DialogContent>
    </Dialog>
  );
};

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  order: CommonOrderFragment;
};
