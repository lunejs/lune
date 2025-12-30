import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@lunejs/ui';
import type { ReactElement } from 'react';

import type { CommonShopFragment } from '@/lib/api/types';

import { ShopSocialsForm } from './form/shop-socials-form';

export const ShopSocials = ({ shop, children }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Shop socials</DialogTitle>
          <DialogDescription>Update your store social networks</DialogDescription>
        </DialogHeader>

        <ShopSocialsForm shop={shop} />
      </DialogContent>
    </Dialog>
  );
};

type Props = {
  children: ReactElement;
  shop: CommonShopFragment;
};
