import { InputGroup, P } from '@lune/ui';

import type { CommonCollectionFragment, CommonCollectionProductFragment } from '@/lib/api/types';

import { CollectionProductsItem } from './item';

export const CollectionProductsTable = ({
  collection,
  allCollectionProducts,
  products,
  onChange
}: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="px-6">
        <InputGroup placeholder="Search products..." onChange={e => onChange(e.target.value)} />
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
            products={allCollectionProducts}
          />
        ))}
      </div>
    </div>
  );
};

type Props = {
  onChange: (q: string) => void;
  collection: CommonCollectionFragment;
  products: CommonCollectionProductFragment[];
  allCollectionProducts: CommonCollectionProductFragment[];
};
