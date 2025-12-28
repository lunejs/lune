import { CodeIcon, DotIcon, EarthIcon, HashIcon, PencilIcon, StoreIcon } from 'lucide-react';

import { formatPhoneNumber } from '@lune/common';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Muted,
  Small
} from '@lune/ui';

import type { CommonShopFragment } from '@/lib/api/types';

import { ShopGeneralInfo } from './general-info/shop-general-info';
import { ShopSecretField } from './secret-field/shop-secret-field';
import { ShopSocials } from './socials/shop-socials';

export const ShopDetails = ({ shop }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <Card className="p-0">
        <CardHeader className="flex pt-6">
          <CardTitle>Store details</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="group p-4 border-t flex items-center justify-between gap-4 transition-colors">
            <div className="flex items-center gap-3">
              <StoreIcon size={20} />

              <div>
                <Small>{shop.name}</Small>
                <Muted className="flex items-center">
                  {shop.email} <DotIcon size={20} />
                  {formatPhoneNumber({ phoneNumber: shop.phoneNumber })}
                </Muted>
              </div>
            </div>
            <ShopGeneralInfo shop={shop}>
              <Button size={'icon'} variant={'ghost'}>
                <PencilIcon
                  className="opacity-0 text-muted-foreground group-hover:opacity-100 transition-opacity"
                  size={16}
                />
              </Button>
            </ShopGeneralInfo>
          </div>

          <div className="group p-4 border-t flex items-center justify-between gap-4 transition-colors">
            <div className="flex items-center gap-3">
              <EarthIcon size={20} />

              <div>
                <Small>Socials</Small>
                <Muted className="flex items-center">
                  Facebook <DotIcon size={20} /> Instagram <DotIcon size={20} /> Twitter
                </Muted>
              </div>
            </div>
            <ShopSocials shop={shop}>
              <Button size={'icon'} variant={'ghost'}>
                <PencilIcon
                  className="opacity-0 text-muted-foreground group-hover:opacity-100 transition-opacity"
                  size={16}
                />
              </Button>
            </ShopSocials>
          </div>
        </CardContent>
      </Card>

      <Card className="p-0">
        <CardHeader className="pt-6">
          <CardTitle>Api Keys</CardTitle>
          <CardDescription>Use these keys to connect your storefront with Lune</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <ShopSecretField icon={HashIcon} label="Shop ID" value={shop.id} />

          <ShopSecretField
            icon={CodeIcon}
            label="Storefront Api Key"
            value={shop.storefrontApiKey}
          />
        </CardContent>
      </Card>
    </div>
  );
};

type Props = {
  shop: CommonShopFragment;
};

// add resolver for find shop by id
