import { PackageCheckIcon, PackageIcon, TruckIcon } from 'lucide-react';
import { Link } from 'react-router';

import { formatDate } from '@lune/common';
import {
  Badge,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Muted,
  Small
} from '@lune/ui';

import type { CommonOrderFragment, ShippingFulfillmentMetadata } from '@/lib/api/types';
import { ImagePlaceholder } from '@/shared/components/placeholders/image-placeholder';

import { FulfillmentStateBadge } from '../../state/fulfillment-state-badge';

export const FulfillmentLineDetails = ({ isOpen, setIsOpen, code, fulfillment }: Props) => {
  const details = fulfillment.metadata as ShippingFulfillmentMetadata;

  return (
    <Dialog isOpen={isOpen} setIsOpen={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {code} <FulfillmentStateBadge state={fulfillment.state} />{' '}
          </DialogTitle>
          <DialogDescription>{formatDate(new Date(fulfillment.createdAt))}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 border rounded-md bg-card p-3">
            {details.shippedAt && (
              <div className="flex items-center gap-2">
                <PackageIcon size={16} />
                <Small className="font-normal">
                  Shipped at: {formatDate(new Date(details.shippedAt))}
                </Small>
              </div>
            )}

            {details.deliveredAt && (
              <div className="flex items-center gap-2">
                <PackageCheckIcon size={16} />
                <Small className="font-normal">
                  Delivered at: {formatDate(new Date(details.deliveredAt))}
                </Small>
              </div>
            )}
            <div className="flex items-center gap-2">
              <TruckIcon size={16} />
              <Small className="font-normal">
                {details.carrier}: {details.trackingCode}
              </Small>
            </div>
          </div>
          <div className="flex flex-col border rounded-md divide-y bg-card">
            {fulfillment.lines.items.map(line => {
              const orderLine = line.orderLine;
              const image =
                orderLine.variant.assets.items[0]?.source ??
                orderLine.variant.product.assets.items[0]?.source;

              return (
                <div key={line.id} className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-2">
                    {image ? (
                      <img className="size-12 object-cover rounded-sm" src={image} />
                    ) : (
                      <ImagePlaceholder initial={orderLine.variant.product.name} />
                    )}
                    <div>
                      <Link to={`/products/${orderLine.variant.product.id}`}>
                        <Small className="hover:underline">{orderLine.variant.product.name}</Small>
                      </Link>
                      <Muted>
                        {orderLine.variant.optionValues.map(opv => opv.name).join(' / ')}
                      </Muted>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Small>x</Small>
                    <Badge variant={'secondary'}>{line.quantity}</Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

type Props = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  code: string;
  fulfillment: CommonOrderFragment['fulfillments']['items'][0];
};
