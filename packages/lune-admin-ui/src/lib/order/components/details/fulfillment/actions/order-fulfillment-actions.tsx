import { useState } from 'react';
import { EllipsisVerticalIcon } from 'lucide-react';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@lune/ui';

import { type CommonOrderFragment } from '@/lib/api/types';

import { MarkAsShippedButton } from '../mark-as-shipped/mark-as-shipped-button';

export const OrderFulfillmentActions = ({ order }: Props) => {
  const [dialogOpen, setDialogOpen] = useState<OrderDialog | null>(null);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <EllipsisVerticalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setDialogOpen(OrderDialog.EditTracking)}>
            Edit tracking
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <MarkAsShippedButton
        isOpen={dialogOpen === OrderDialog.EditTracking}
        setIsOpen={value => setDialogOpen(!value ? null : OrderDialog.EditTracking)}
        order={order}
      />
    </>
  );
};

type Props = {
  order: CommonOrderFragment;
};

enum OrderDialog {
  EditTracking
}
