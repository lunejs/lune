import { useEffect, useState } from 'react';
import { ListFilterIcon } from 'lucide-react';
import { useParams } from 'react-router';
import { useDebouncedCallback } from 'use-debounce';

import { Button, InputGroup } from '@vendyx/ui';

import { useGetProducts } from '@/lib/product/hooks/use-get-products';
import { SpinnerLoader } from '@/shared/components/loader/spinner-loader';
import { TYPING_DEBOUNCE_DELAY } from '@/shared/utils/constants.utils';

import { type TranslatePageParams } from '../../pages/translate-products-page';

import { TranslateListItem } from './item/translate-list-item';

export const TranslateList = () => {
  const { id } = useParams() as TranslatePageParams;
  const [query, setQuery] = useState('');

  const { products, isLoading, isRefetching, refetch } = useGetProducts({
    filters: {
      archived: { equals: false },
      ...(query && { name: { contains: query } })
    }
  });

  useEffect(() => {
    refetch();
  }, [query]);

  const debouncedOnQueryChange = useDebouncedCallback(value => {
    setQuery(value);
  }, TYPING_DEBOUNCE_DELAY);

  return (
    <aside className="w-96 divide-y h-full flex flex-col gap-4 shrink-0">
      <header className="flex items-center gap-3 p-4">
        <InputGroup
          placeholder="Search products..."
          onChange={e => debouncedOnQueryChange(e.target.value)}
          rightAddon={isRefetching && <SpinnerLoader />}
        />
        <Button variant={'outline'}>
          <ListFilterIcon />
        </Button>
      </header>
      <div className="flex flex-col gap-4 px-4">
        {isLoading && (
          <div className="w-full flex justify-center pt-6">
            <SpinnerLoader />
          </div>
        )}
        {products?.map(product => {
          const isSelected = product.id === id;

          return (
            <TranslateListItem
              key={product.id}
              href={`/translate/products/${product.id}`}
              isSelected={isSelected}
              title={product.name}
              image={product.assets.items[0]?.source}
            />
          );
        })}
      </div>
    </aside>
  );
};
