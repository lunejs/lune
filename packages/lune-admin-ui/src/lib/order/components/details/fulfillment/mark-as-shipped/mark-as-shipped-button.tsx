import { PackagePlusIcon } from 'lucide-react';

import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@lune/ui';

import type { CommonOrderFragment } from '@/lib/api/types';

import { MarkAsShippedForm } from './form/mark-as-shipped-form';

export const MarkAsShippedButton = ({ isOpen, setIsOpen, order }: Props) => {
  return (
    <Dialog isOpen={isOpen} setIsOpen={setIsOpen}>
      <DialogTrigger>
        <Button variant={'outline'} size={'sm'}>
          <PackagePlusIcon size={16} /> Mark as shipped
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Mark as shipped</DialogTitle>
        </DialogHeader>

        <MarkAsShippedForm order={order} />
      </DialogContent>
    </Dialog>
  );
};

type Props = {
  isOpen?: boolean;
  setIsOpen?: (value: boolean) => void;
  order: CommonOrderFragment;
};
