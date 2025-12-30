import { ChevronRightIcon, PackageIcon, ShoppingCartIcon, TruckIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@lunejs/ui';

import { DiscountApplicationLevel } from '@/lib/api/types';

import { useGetDiscountHandlers } from '../../hooks/use-get-discount-handlers';

export const DiscountSelector = ({ children }: Props) => {
  const { discountHandlers } = useGetDiscountHandlers();

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="px-0 pb-0 overflow-hidden">
        <DialogHeader className="px-6">
          <DialogTitle>Select discount type</DialogTitle>
          <DialogDescription>Choose the type of discount you want to create</DialogDescription>
        </DialogHeader>
        <div className="divide-y border-t">
          {discountHandlers.map(handler => {
            return (
              <Link
                key={handler.code}
                to={`/discounts/new?code=${handler.code}`}
                className="group py-3 px-6 flex justify-between items-center hover:bg-muted/50"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-normal">{handler.name}</h3>
                    {handler.applicationLevel === DiscountApplicationLevel.Order ? (
                      <ShoppingCartIcon size={18} />
                    ) : handler.applicationLevel === DiscountApplicationLevel.OrderLine ? (
                      <PackageIcon size={18} />
                    ) : handler.applicationLevel === DiscountApplicationLevel.DeliveryMethod ? (
                      <TruckIcon size={18} />
                    ) : null}
                  </div>
                  <p className="font-normal text-muted-foreground text-sm">{handler.description}</p>
                </div>
                <ChevronRightIcon size={18} className="text-muted-foreground" />
              </Link>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

type Props = {
  children: ReactNode;
};
