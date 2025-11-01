import { useMemo, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@lune/ui';

import type { CommonCollectionFragment } from '@/lib/api/types';
import { SpinnerLoader } from '@/shared/components/loader/spinner-loader';
import { TYPING_DEBOUNCE_DELAY } from '@/shared/utils/constants.utils';

import { useGetCollectionProducts } from '../../hooks/use-get-collection-products';

import { ProductsSelector } from './products-selector/products-selector';
import { CollectionProductsTable } from './table/collection-products-table';

export const CollectionProductsCard = ({ collection }: Props) => {
  const [query, setQuery] = useState('');

  const { isLoading, products: collectionProducts } = useGetCollectionProducts(collection.id);

  const onQueryChange = useDebouncedCallback(setQuery, TYPING_DEBOUNCE_DELAY);

  const products = useMemo(
    () => collectionProducts.filter(p => p.name.toLowerCase().includes(query.toLowerCase())),
    [collectionProducts]
  );

  return (
    <Card className="pb-0 overflow-hidden">
      <CardHeader>
        <CardTitle className="col-start-1 row-span-2 row-start-1 self-start justify-self-start h-full flex items-center">
          Products
        </CardTitle>
        <CardAction>
          <ProductsSelector
            collection={collection}
            defaultSelected={collectionProducts.map(p => p.id)}
            disabled={isLoading}
          />
        </CardAction>
      </CardHeader>
      <CardContent className="px-0">
        {isLoading && (
          <div className="w-full flex justify-center px-6">
            <SpinnerLoader />
          </div>
        )}

        {!isLoading && (
          <CollectionProductsTable
            collection={collection}
            onChange={onQueryChange}
            products={products}
            allCollectionProducts={collectionProducts}
          />
        )}
      </CardContent>
    </Card>
  );
};

type Props = {
  collection: CommonCollectionFragment;
};
