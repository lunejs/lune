import { useState } from 'react';
import { EllipsisVerticalIcon, XIcon } from 'lucide-react';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@lune/ui';

export const OrderActions = () => {
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
          <DropdownMenuItem onClick={() => setDialogOpen(OrderDialog.Cancel)}>
            <XIcon className="text-destructive" /> <span className="text-destructive">Cancel</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

enum OrderDialog {
  Cancel
}
