import { useMemo, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { notification, P } from '@lune/ui';

import type { CommonCollectionFragment } from '@/lib/api/types';
import { ItemsTable } from '@/shared/components/items-table/items-table';
import { TYPING_DEBOUNCE_DELAY } from '@/shared/utils/constants.utils';

import { useGetCollectionProducts } from '../../hooks/use-get-collection-products';
import { useUpdateCollection } from '../../hooks/use-update-collection';

import { ProductsSelector } from './products-selector/products-selector';

export const CollectionProductsCard = ({ collection }: Props) => {
  const [query, setQuery] = useState('');

  const { updateCollection } = useUpdateCollection();
  const { isLoading, products: collectionProducts } = useGetCollectionProducts(collection.id);

  const onQueryChange = useDebouncedCallback(setQuery, TYPING_DEBOUNCE_DELAY);

  const products = useMemo(
    () => collectionProducts.filter(p => p.name.toLowerCase().includes(query.toLowerCase())),
    [collectionProducts]
  );

  return (
    <ItemsTable>
      <ItemsTable.Header>
        <ItemsTable.HeaderTitle>Products</ItemsTable.HeaderTitle>
        <ItemsTable.HeaderAction>
          <ProductsSelector
            collection={collection}
            defaultSelected={collectionProducts.map(p => p.id)}
            disabled={isLoading}
          />
        </ItemsTable.HeaderAction>
      </ItemsTable.Header>
      <ItemsTable.Content isLoading={isLoading}>
        <ItemsTable.Search
          placeholder="Search products..."
          onChange={e => onQueryChange(e.target.value)}
        />

        <ItemsTable.List>
          {!products?.length && (
            <div className="flex justify-center py-8">
              <P className="text-muted-foreground">No results</P>
            </div>
          )}
          {products?.map(product => (
            <ItemsTable.ListItem
              key={product.id}
              title={product.name}
              image={product.assets.items[0]?.source}
              enabled={product.enabled}
              href={`/products/${product.id}`}
              onRemove={async () => {
                const result = await updateCollection(collection.id, {
                  products: [...collectionProducts.map(p => p.id).filter(id => id !== product.id)]
                });

                if (!result.isSuccess) {
                  notification.error(result.error);
                  return;
                }

                notification.success('Product removed');
              }}
            />
          ))}
        </ItemsTable.List>
      </ItemsTable.Content>
    </ItemsTable>
  );
};

type Props = {
  collection: CommonCollectionFragment;
};
