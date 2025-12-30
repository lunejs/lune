import { Button } from '@lunejs/ui';
import { CircleFadingPlusIcon } from 'lucide-react';

import type { CommonCollectionFragment } from '@/lib/api/types';
import { EntitySelector } from '@/shared/components/entity-selector/entity-selector';
import { DefaultEntitySelectorRow } from '@/shared/components/entity-selector/rows/default-entity-selector-row';

import { useProductsSelector } from './use-products-selector';

export const ProductsSelector = ({ disabled, defaultSelected, collection }: Props) => {
  const { selectProducts, isLoading, products, setQuery } = useProductsSelector(collection.id);

  return (
    <EntitySelector
      title="Add products"
      description="Add products to your collection"
      trigger={
        <Button variant={'outline'} type="button" disabled={disabled}>
          <CircleFadingPlusIcon /> Add products
        </Button>
      }
      items={products}
      isLoading={isLoading}
      defaultSelected={products.filter(p => defaultSelected.includes(p.id))}
      onSearch={setQuery}
      getRowId={item => item.id}
      onDone={async selected => selectProducts(selected)}
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
  collection: CommonCollectionFragment;
  disabled: boolean;
  defaultSelected: string[];
};
