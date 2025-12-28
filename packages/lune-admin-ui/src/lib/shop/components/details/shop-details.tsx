import { CodeIcon, EarthIcon, HashIcon, PencilIcon, StoreIcon } from 'lucide-react';

import { Button, Card, CardContent, CardHeader, CardTitle, Muted, Small } from '@lune/ui';

import type { CommonShopFragment } from '@/lib/api/types';

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
                <Muted>{shop.email}</Muted>
              </div>
            </div>
            <Button size={'icon'} variant={'ghost'}>
              <PencilIcon
                className="opacity-0 text-muted-foreground group-hover:opacity-100 transition-opacity"
                size={16}
              />
            </Button>
          </div>

          <div className="group p-4 border-t flex items-center justify-between gap-4 transition-colors">
            <div className="flex items-center gap-3">
              <EarthIcon size={20} />

              <div>
                <Small>Socials</Small>
                <Muted>Facebook - Instagram - Twitter</Muted>
              </div>
            </div>
            <Button size={'icon'} variant={'ghost'}>
              <PencilIcon
                className="opacity-0 text-muted-foreground group-hover:opacity-100 transition-opacity"
                size={16}
              />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="p-0">
        <CardHeader className="flex pt-6">
          <CardTitle>Api Keys</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="group p-4 border-t flex items-center justify-between gap-4 transition-colors">
            <div className="flex items-center gap-3">
              <HashIcon size={20} />

              <div>
                <Small>Shop ID</Small>
                <Muted>{shop.id}</Muted>
              </div>
            </div>
          </div>

          <div className="group p-4 border-t flex items-center justify-between gap-4 transition-colors">
            <div className="flex items-center gap-3">
              <CodeIcon size={20} />

              <div>
                <Small>Storefront Api Key</Small>
                <Muted>{shop.storefrontApiKey}</Muted>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

type Props = {
  shop: CommonShopFragment;
};

// add resolver for find shop by id
