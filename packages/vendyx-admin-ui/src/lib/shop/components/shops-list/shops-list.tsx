import { ChevronRightIcon, Loader2Icon } from 'lucide-react';

import type { CommonListShopFragment } from '@/lib/api/types';

import { Label } from '../../../../../../vendyx-ui/dist';

import { ShopsListEmptyState } from './empty-state';
import { useSelectShop } from './use-select-shop';

export const ShopsList = ({ shops, isLoading }: Props) => {
  const { selectShop } = useSelectShop();

  if (isLoading) {
    return (
      <div role="status" aria-label="Loading shops" className="w-full flex justify-center">
        <Loader2Icon size={16} className="animate-spin" />
      </div>
    );
  }

  if (!isLoading && !shops.length) {
    return <ShopsListEmptyState />;
  }

  return shops.map(shop => (
    <button
      aria-label={`Select ${shop.name}`}
      onClick={() => selectShop(shop.id)}
      className="text-start"
      key={shop.slug}
    >
      <article className="flex items-center justify-between hover:bg-muted p-3 rounded-md mx-3 transition-colors">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 bg-foreground flex justify-center items-center rounded-md">
            <span className="text-background">{shop.name.charAt(0)}</span>
          </div>
          <div className="flex flex-col gap-1">
            <Label asChild>
              <p>{shop.name}</p>
            </Label>
            <Label asChild className="text-muted-foreground">
              <p>{shop.slug}.com</p>
            </Label>
          </div>
        </div>
        <div>
          <ChevronRightIcon size={16} />
        </div>
      </article>
    </button>
  ));
};

type Props = {
  shops: CommonListShopFragment[];
  isLoading: boolean;
};
