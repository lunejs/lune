import { useState } from 'react';
import { CircleFadingPlusIcon } from 'lucide-react';

import { wait } from '@lune/common';
import { Button } from '@lune/ui';

import { useGetProducts } from '@/lib/product/hooks/use-get-products';
import { EntitySelector } from '@/shared/components/entity-selector/entity-selector';
import { DefaultEntitySelectorRow } from '@/shared/components/entity-selector/rows/default-entity-selector-row';

export const ProductsSelector = ({ disabled, defaultSelected }: Props) => {
  const [query, setQuery] = useState('');

  const { isLoading, products: fetchedProducts } = useGetProducts();

  const products = fetchedProducts.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <EntitySelector
      title="Add products"
      description="Add products to your collection"
      isLoading={isLoading}
      items={products}
      onSearch={setQuery}
      getRowId={item => item.id}
      defaultSelected={products.filter(p => defaultSelected.includes(p.id))}
      onDone={async selected => {
        await wait(2000);
        console.log({ selected });
      }}
      trigger={
        <Button variant={'outline'} type="button" disabled={disabled}>
          <CircleFadingPlusIcon /> Add products
        </Button>
      }
      renderItem={({ rowId, item, isSelected, onSelect }) => (
        <DefaultEntitySelectorRow
          key={rowId}
          title={item.name}
          image={item.assets.items[0]?.source}
          isSelected={isSelected}
          onSelect={onSelect}
        />
      )}
    />
  );
};

type Props = {
  disabled: boolean;
  defaultSelected: string[];
};
