import { useEffect, useState } from 'react';
import { CircleFadingPlusIcon } from 'lucide-react';
import { useDebouncedCallback } from 'use-debounce';

import { Button, Card, CardAction, CardContent, CardHeader, CardTitle, InputGroup } from '@lune/ui';

import type { CommonCollectionFragment } from '@/lib/api/types';
import { SpinnerLoader } from '@/shared/components/loader/spinner-loader';
import { TYPING_DEBOUNCE_DELAY } from '@/shared/utils/constants.utils';

import { useGetCollectionProducts } from '../../hooks/use-get-collection-products';

import { CollectionProductsItem } from './product-item';

export const CollectionProductsCard = ({ collection }: Props) => {
  const [query, setQuery] = useState('');

  const { isLoading, isRefetching, products, refetch } = useGetCollectionProducts(collection.id, {
    filters: {
      ...(query ? { name: { contains: query } } : {})
    }
  });

  useEffect(() => {
    refetch();
  }, [query]);

  // const hasNoProducts = !products?.length && !query && !isLoading;

  const onQueryChange = useDebouncedCallback(setQuery, TYPING_DEBOUNCE_DELAY);

  return (
    <Card className="pb-0 overflow-hidden">
      <CardHeader>
        <CardTitle className="col-start-1 row-span-2 row-start-1 self-start justify-self-start h-full flex items-center">
          Products
        </CardTitle>
        <CardAction>
          <Button variant={'outline'} type="button" disabled={isLoading}>
            <CircleFadingPlusIcon /> Add products
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="px-0">
        {isLoading && (
          <div className="w-full flex justify-center px-6">
            <SpinnerLoader />
          </div>
        )}

        {!isLoading && (
          <div className="flex flex-col gap-4">
            <div className="px-6">
              <InputGroup
                placeholder="Search products..."
                onChange={e => onQueryChange(e.target.value)}
                rightAddon={isRefetching && <SpinnerLoader />}
              />
            </div>
            <div className="divide-y border-t">
              {products?.map(product => (
                <CollectionProductsItem product={product} />
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

type Props = {
  collection: CommonCollectionFragment;
};
