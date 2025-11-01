import { useEffect, useState } from 'react';
import { ListFilterIcon } from 'lucide-react';
import { useParams } from 'react-router';
import { useDebouncedCallback } from 'use-debounce';

import {
  Button,
  cn,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  InputGroup
} from '@lune/ui';

import { useGetProducts } from '@/lib/product/hooks/use-get-products';
import { SpinnerLoader } from '@/shared/components/loader/spinner-loader';
import { TYPING_DEBOUNCE_DELAY } from '@/shared/utils/constants.utils';

import { TranslateListItem } from '../../list/item/translate-list-item';

export const ProductTranslateList = ({ className }: Props) => {
  const { id } = useParams() as { id: string };
  const [query, setQuery] = useState('');
  const [published, setPublished] = useState<boolean>(true);
  const [archived, setArchived] = useState<boolean>(false);

  const { products, isLoading, isRefetching, refetch } = useGetProducts({
    filters: {
      archived: { equals: archived },
      enabled: { equals: published },
      ...(query && { name: { contains: query } })
    }
  });

  useEffect(() => {
    refetch();
  }, [query, archived, published]);

  const debouncedOnQueryChange = useDebouncedCallback(value => {
    setQuery(value);
  }, TYPING_DEBOUNCE_DELAY);

  return (
    <aside className={cn('flex w-80 divide-y h-full flex-col shrink-0', className?.root)}>
      <header className="flex items-center gap-3 p-4">
        <InputGroup
          placeholder="Search products..."
          onChange={e => debouncedOnQueryChange(e.target.value)}
          rightAddon={isRefetching && <SpinnerLoader />}
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size={'icon'} variant={'outline'}>
              <ListFilterIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuCheckboxItem
              checked={published}
              onCheckedChange={value => setPublished(value)}
            >
              Published
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={!published}
              onCheckedChange={value => setPublished(!value)}
            >
              Unpublished
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={archived}
              onCheckedChange={value => setArchived(value)}
            >
              Archived
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <div className={cn('flex flex-col gap-4 px-4 py-4', className?.list)}>
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

type Props = {
  className?: {
    root?: string;
    list?: string;
  };
};
