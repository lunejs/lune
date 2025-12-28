import { useState } from 'react';
import { InfoIcon, MoreVerticalIcon, PackageCheckIcon, PackageIcon, TruckIcon } from 'lucide-react';

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
  type DeliveryMethodPickup,
  FulfillmentState
} from '@/lib/api/types';
import { useMarkFulfillmentAsPickedUp } from '@/lib/order/hooks/use-mark-fulfillment-as-picked-up';
import { useMarkFulfillmentAsReadyForPickup } from '@/lib/order/hooks/use-mark-fulfillment-as-ready-for-pickup';
import { useLoadingNotification } from '@/shared/hooks/use-loading-notification';

import { FulfillmentStateBadge } from '../state/fulfillment-state-badge';

import { FulfillmentLineDetails } from './details/fulfillment-line-details';

export const OrderInStorePickupFulfillmentDetails = ({ fulfillment, order }: Props) => {
  const { loading, failure, success } = useLoadingNotification();
  const [dialogOpen, setDialogOpen] = useState<FulfillmentDialog | null>(null);

  const { isLoading: isGettingReady, markAsReadyForPickup } = useMarkFulfillmentAsReadyForPickup();
  const { isLoading: isPicking, markAsPickedUp } = useMarkFulfillmentAsPickedUp();

  const deliveryMethod = order.deliveryMethod?.details as DeliveryMethodPickup;

  const totalQuantity = fulfillment.lines.items.reduce((prev, curr) => prev + curr.quantity, 0);

  return (
    <div className="flex items-center justify-between flex-wrap gap-4">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1">
          <TruckIcon size={16} />
          <Small>{fulfillment.code}</Small>
          <div className="ml-2">
            <FulfillmentStateBadge state={fulfillment.state} />
          </div>
        </div>
        <Muted>{deliveryMethod.location.name}</Muted>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center gap-1">
          <Muted className="flex items-center">
            {totalQuantity === 1 ? `${totalQuantity} item` : `${totalQuantity} items`}
          </Muted>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size={'icon'} variant={'ghost'} disabled={isGettingReady || isPicking}>
              <MoreVerticalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setDialogOpen(FulfillmentDialog.Details)}>
              <InfoIcon /> View details
            </DropdownMenuItem>
            {fulfillment.state === FulfillmentState.Pending && (
              <DropdownMenuItem
                onClick={async () => {
                  loading('Updating...');
                  const result = await markAsReadyForPickup(order.id, fulfillment.id);

                  if (!result.isSuccess) {
                    failure(result.error);
                    return;
                  }

                  success('Fulfillment marked as ready for pickup');
                }}
              >
                <PackageIcon /> Mark as Ready for pickup
              </DropdownMenuItem>
            )}
            {fulfillment.state === FulfillmentState.ReadyForPickup && (
              <DropdownMenuItem
                onClick={async () => {
                  loading('Updating...');
                  const result = await markAsPickedUp(order.id, fulfillment.id);

                  if (!result.isSuccess) {
                    failure(result.error);
                    return;
                  }

                  success('Fulfillment marked as picked up');
                }}
              >
                <PackageCheckIcon /> Mark as Picked up
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <FulfillmentLineDetails
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
  order: CommonOrderFragment;
  fulfillment: CommonOrderFragment['fulfillments']['items'][0];
};
