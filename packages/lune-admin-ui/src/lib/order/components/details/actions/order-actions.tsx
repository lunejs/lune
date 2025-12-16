import { useState } from 'react';
import { CheckCircle2Icon, EllipsisVerticalIcon, XIcon } from 'lucide-react';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@lune/ui';

import { type CommonOrderFragment, OrderState } from '@/lib/api/types';

import { CompleteOrderAlert } from './complete/complete-order-alert';

export const OrderActions = ({ order }: Props) => {
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
          {order.state === OrderState.Delivered && (
            <DropdownMenuItem onClick={() => setDialogOpen(OrderDialog.Complete)}>
              <CheckCircle2Icon /> Complete
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={() => setDialogOpen(OrderDialog.Cancel)}>
            <XIcon className="text-destructive" /> <span className="text-destructive">Cancel</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {
        <CompleteOrderAlert
          isOpen={dialogOpen === OrderDialog.Complete}
          setIsOpen={value => (!value ? setDialogOpen(null) : setDialogOpen(OrderDialog.Complete))}
          order={order}
        />
      }
    </>
  );
};

enum OrderDialog {
  Cancel,
  Complete
}

type Props = {
  order: CommonOrderFragment;
};
