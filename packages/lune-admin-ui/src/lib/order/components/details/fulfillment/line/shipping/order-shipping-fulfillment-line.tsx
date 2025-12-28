import { useState } from 'react';
import { InfoIcon, MoreVerticalIcon, PackageCheckIcon, TruckIcon, XIcon } from 'lucide-react';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Muted,
  Small
} from '@lune/ui';

import type { CommonOrderFragment, ShippingFulfillmentMetadata } from '@/lib/api/types';

import { FulfillmentLineDetails } from '../details/fulfillment-line-details';

export const OrderShippingFulfillmentLine = ({ code, fulfillment }: Props) => {
  const [dialogOpen, setDialogOpen] = useState<FulfillmentDialog | null>(null);

  const details = fulfillment?.metadata as ShippingFulfillmentMetadata;

  const totalQuantity = fulfillment.lines.items.reduce((prev, curr) => prev + curr.quantity, 0);

  return (
    <div className="flex items-center justify-between flex-wrap gap-4">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1">
          <TruckIcon size={16} />
          <Small>{code}</Small>
        </div>
        {details.trackingCode && (
          <Muted>
            {details.carrier}: {details.trackingCode}
          </Muted>
        )}
      </div>
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center gap-1">
          <Muted className="flex items-center">
            {totalQuantity === 1 ? `${totalQuantity} item` : `${totalQuantity} items`}
          </Muted>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size={'icon'} variant={'ghost'}>
              <MoreVerticalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setDialogOpen(FulfillmentDialog.Details)}>
              <InfoIcon /> View details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDialogOpen(FulfillmentDialog.MarkAsDelivered)}>
              <PackageCheckIcon /> Mark as Delivered
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => setDialogOpen(FulfillmentDialog.Cancel)}>
              <XIcon className="text-destructive" />{' '}
              <span className="text-destructive">Cancel</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <FulfillmentLineDetails
          code={code}
          fulfillment={fulfillment}
          isOpen={dialogOpen === FulfillmentDialog.Details}
          setIsOpen={value =>
            !value ? setDialogOpen(null) : setDialogOpen(FulfillmentDialog.Details)
          }
        />
      </div>
    </div>
  );
};

const enum FulfillmentDialog {
  Details,
  MarkAsDelivered,
  Cancel
}

type Props = {
  code: string;
  fulfillment: CommonOrderFragment['fulfillments']['items'][0];
};
