import { useState } from 'react';
import { CheckCircle2Icon, EllipsisVerticalIcon, XIcon } from 'lucide-react';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@lunejs/ui';

import { type CommonOrderFragment, OrderState } from '@/lib/api/types';

import { CancelOrderDialog } from './cancel/cancel-order-dialog';
import { CompleteOrderAlert } from './complete/complete-order-alert';

export const OrderActions = ({ order }: Props) => {
  const [dialogOpen, setDialogOpen] = useState<OrderDialog | null>(null);

  if ([OrderState.Completed, OrderState.Canceled].includes(order.state)) return null;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <EllipsisVerticalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {order.state === OrderState.Fulfilled && (
            <DropdownMenuItem onClick={() => setDialogOpen(OrderDialog.Complete)}>
              <CheckCircle2Icon /> Complete
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={() => setDialogOpen(OrderDialog.Cancel)}>
            <XIcon className="text-destructive" /> <span className="text-destructive">Cancel</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <CompleteOrderAlert
        isOpen={dialogOpen === OrderDialog.Complete}
        setIsOpen={value => (!value ? setDialogOpen(null) : setDialogOpen(OrderDialog.Complete))}
        order={order}
      />
      <CancelOrderDialog
        isOpen={dialogOpen === OrderDialog.Cancel}
        setIsOpen={value => (!value ? setDialogOpen(null) : setDialogOpen(OrderDialog.Cancel))}
        order={order}
      />
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
