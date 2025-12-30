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

import { ShopGeneralInfoForm } from './form/shop-general-info-form';

export const ShopGeneralInfo = ({ shop, children }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{shop.name}</DialogTitle>
          <DialogDescription>Update you store details</DialogDescription>
        </DialogHeader>

        <ShopGeneralInfoForm shop={shop} />
      </DialogContent>
    </Dialog>
  );
};

type Props = {
  children: ReactElement;
  shop: CommonShopFragment;
};
