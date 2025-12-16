import { PackageCheckIcon } from 'lucide-react';

import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@lune/ui';

import type { CommonOrderFragment } from '@/lib/api/types';

import { MarkAsDeliveredForm } from './form/mark-as-delivered-form';

export const MarkAsDeliveredButton = ({ order }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <PackageCheckIcon size={16} /> Mark as delivered
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Mark order as delivered</DialogTitle>
        </DialogHeader>
        <MarkAsDeliveredForm order={order} />
      </DialogContent>
    </Dialog>
  );
};

type Props = {
  order: CommonOrderFragment;
};
