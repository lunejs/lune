import { InputGroup, P } from '@lune/ui';

import type { CommonCollectionFragment, CommonCollectionProductFragment } from '@/lib/api/types';
import { SpinnerLoader } from '@/shared/components/loader/spinner-loader';

import { CollectionProductsItem } from './item';

export const CollectionProductsTable = ({
  collection,
  products,
  onChange,
  isRefetching
}: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="px-6">
        <InputGroup
          placeholder="Search products..."
          onChange={e => onChange(e.target.value)}
          rightAddon={isRefetching && <SpinnerLoader />}
        />
      </div>
      <div className="divide-y border-t">
        {!products?.length && (
          <div className="flex justify-center py-8">
            <P className="text-muted-foreground">No results</P>
          </div>
        )}
        {products?.map(product => (
          <CollectionProductsItem
            key={product.id}
            product={product}
            collection={collection}
            products={products}
          />
        ))}
      </div>
    </div>
  );
};

type Props = {
  onChange: (q: string) => void;
  collection: CommonCollectionFragment;
  isRefetching: boolean;
  products: CommonCollectionProductFragment[];
};
