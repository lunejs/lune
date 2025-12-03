import { ChevronRightIcon, ShoppingCartIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@lune/ui';

import { useGetDiscountHandlers } from '../../hooks/use-get-discount-handlers';

export const DiscountSelector = ({ children }: Props) => {
  const { discountHandlers } = useGetDiscountHandlers();

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="px-0 pb-0">
        <DialogHeader className="px-6">
          <DialogTitle>Select discount type</DialogTitle>
          <DialogDescription>Choose the type of discount you want to create</DialogDescription>
        </DialogHeader>
        <div className="divide-y border-t">
          {discountHandlers.map(handler => {
            return (
              <Link
                to={`/discounts/new?type=${handler.code}`}
                className="group py-3 px-6 flex justify-between items-center hover:bg-muted/50"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-normal">{handler.name}</h3>
                    {/* <Icon size={type === DiscountType.BuyXGetY ? 20 : 18} /> */}
                    <ShoppingCartIcon size={16} />
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
