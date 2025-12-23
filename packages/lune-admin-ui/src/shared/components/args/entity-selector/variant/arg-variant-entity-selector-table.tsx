import { useEffect, useState } from 'react';

import { LunePrice } from '@lune/common';
import { Small } from '@lune/ui';

import { useGetProducts } from '@/lib/product/hooks/use-get-products';
import { ItemsTable } from '@/shared/components/items-table/items-table';

import { ArgVariantEntitySelector } from './arg-variant-entity-selector';

export const ArgVariantEntitySelectorTable = ({ onValueChange, defaultSelected }: Props) => {
  const { isLoading, products: allProducts } = useGetProducts();

  const [selected, setSelected] = useState<string[]>(defaultSelected);
  const [value, setValue] = useState<string[]>(defaultSelected);

  const products = allProducts.filter(product =>
    product.variants.items.some(v => selected.includes(v.id))
  );

  useEffect(() => {
    onValueChange(value);
  }, [value]);

  return (
    <ItemsTable>
      <ItemsTable.Header>
        <ItemsTable.HeaderTitle className="col-start-1 row-span-2 row-start-1 self-start justify-self-start h-full flex items-center">
          Products
        </ItemsTable.HeaderTitle>
        <ItemsTable.HeaderAction>
          <ArgVariantEntitySelector
            products={allProducts}
            defaultSelected={defaultSelected}
            onDone={selected => {
              setValue(selected);
              setSelected(selected);
            }}
          />
        </ItemsTable.HeaderAction>
      </ItemsTable.Header>
      <ItemsTable.Content isLoading={isLoading}>
        {/* <ItemsTable.Search
          placeholder="Search products..."
          onChange={e => onQueryChange(e.target.value)}
        /> */}

        <ItemsTable.List>
          {!products?.length && (
            <div className="flex justify-center py-8">
              <Small className="text-muted-foreground">No results</Small>
            </div>
          )}
          {products?.map(product => {
            const variants = product.variants.items;
            const variantsInProduct = variants.filter(v => selected.includes(v.id));

            const isDefaultVariant =
              variantsInProduct.length === 1 && variantsInProduct[0].optionValues.length === 0;

            return (
              <ItemsTable.ListItem
                key={product.id}
                title={product.name}
                subtitle={
                  isDefaultVariant
                    ? LunePrice.format(variantsInProduct[0].salePrice)
                    : `${variantsInProduct.length} of ${variants.length} ${variants.length > 1 ? 'variants' : 'variant'}`
                }
                image={product.assets.items[0]?.source}
                enabled={product.enabled}
                href={`/products/${product.id}`}
                onRemove={async () => {
                  const variantsIds = product.variants.items.map(v => v.id);
                  const newSelected = selected.filter(
                    selectedVariant => !variantsIds.includes(selectedVariant)
                  );

                  setSelected(newSelected);
                  setValue(newSelected);
                }}
              />
            );
          })}
        </ItemsTable.List>
      </ItemsTable.Content>
    </ItemsTable>
  );
};

type Props = {
  onValueChange: (value: string[]) => void;
  defaultSelected: string[];
};
