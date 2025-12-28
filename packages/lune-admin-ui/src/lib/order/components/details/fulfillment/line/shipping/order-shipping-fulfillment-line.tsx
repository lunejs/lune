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

import {
  type CommonOrderFragment,
  FulfillmentState,
  type ShippingFulfillmentMetadata
} from '@/lib/api/types';
import { useMarkFulfillmentAsDelivered } from '@/lib/order/hooks/use-mark-fulfillment-as-delivered';
import { useLoadingNotification } from '@/shared/hooks/use-loading-notification';

import { FulfillmentStateBadge } from '../../state/fulfillment-state-badge';
import { FulfillmentLineDetails } from '../details/fulfillment-line-details';

export const OrderShippingFulfillmentLine = ({ code, order, fulfillment }: Props) => {
  const { loading, failure, success } = useLoadingNotification();
  const [dialogOpen, setDialogOpen] = useState<FulfillmentDialog | null>(null);
  const { isLoading, markAsDelivered } = useMarkFulfillmentAsDelivered();

  const details = fulfillment?.metadata as ShippingFulfillmentMetadata;
  const totalQuantity = fulfillment.lines.items.reduce((prev, curr) => prev + curr.quantity, 0);

  return (
    <div className="flex items-center justify-between flex-wrap gap-4">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1">
          <TruckIcon size={16} />
          <Small>{code}</Small>
          <div className="ml-2">
            <FulfillmentStateBadge state={fulfillment.state} />
          </div>
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
            <Button size={'icon'} variant={'ghost'} disabled={isLoading}>
              <MoreVerticalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setDialogOpen(FulfillmentDialog.Details)}>
              <InfoIcon /> View details
            </DropdownMenuItem>
            {fulfillment.state === FulfillmentState.Shipped && (
              <DropdownMenuItem
                onClick={async () => {
                  loading('Updating...');

                  const result = await markAsDelivered(order.id, fulfillment.id);

                  if (!result.isSuccess) {
                    failure(result.error);
                    return;
                  }

                  success('Fulfillment marked as delivered');
                }}
              >
                <PackageCheckIcon /> Mark as Delivered
              </DropdownMenuItem>
            )}

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
  order: CommonOrderFragment;
  fulfillment: CommonOrderFragment['fulfillments']['items'][0];
};
