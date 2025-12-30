import { useMemo, useState } from 'react';
import { Button } from '@lunejs/ui';

import type { CommonListProductFragment } from '@/lib/api/types';
import { EntitySelector } from '@/shared/components/entity-selector/entity-selector';
import { AccordionEntitySelectorRow } from '@/shared/components/entity-selector/rows/accordion-entity-selector-row';

export const ArgVariantEntitySelector = ({
  defaultSelected,
  products: allProducts,
  onDone
}: Props) => {
  const [selectedVariants, setSelectedVariants] = useState<string[]>(defaultSelected);
  const [search, setSearch] = useState('');

  const products = useMemo(
    () => allProducts.filter(country => country.name.toLowerCase().includes(search.toLowerCase())),
    [allProducts, search]
  );
  return (
    <EntitySelector
      maxHeight
      title="Add products"
      description="Add products to this discount"
      trigger={
        <Button variant={'outline'} type="button">
          Add products
        </Button>
      }
      items={products}
      isLoading={false}
      defaultSelected={[]}
      onSearch={setSearch}
      getRowId={item => item.id}
      onDone={async () => {
        onDone(selectedVariants);
        return true;
      }}
      renderItem={({ item: product }) => {
        return (
          <AccordionEntitySelectorRow
            key={product.id}
            value={product.id}
            checked={selectedVariants.some(selectedVariant =>
              product.variants.items.some(v => v.id === selectedVariant)
            )}
            onCheckedChange={checked => {
              if (checked) {
                setSelectedVariants([
                  ...selectedVariants,
                  ...product.variants.items.map(v => v.id)
                ]);
              } else {
                const variantsIds = product.variants.items.map(v => v.id);

                setSelectedVariants(
                  selectedVariants.filter(selectedVariant => !variantsIds.includes(selectedVariant))
                );
              }
            }}
            label={product.name}
            image={product.assets.items?.[0]?.source}
            content={product.variants.items
              .filter(v => v.optionValues.length) // remove variants without options
              .map(variant => ({
                id: variant.id,
                label: variant.optionValues.map(v => v.name).join(' / '),
                checked: selectedVariants.includes(variant.id),
                onCheckedChange: checked => {
                  if (checked) {
                    setSelectedVariants([...selectedVariants, variant.id]);
                  } else {
                    setSelectedVariants(selectedVariants.filter(v => v !== variant.id));
                  }
                }
              }))}
          />
        );
      }}
    />
  );
};

type Props = {
  products: CommonListProductFragment[];
  defaultSelected: string[];
  onDone: (selected: string[]) => void;
};
