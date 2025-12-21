import { useMemo, useState } from 'react';

import { Badge, cn, Label } from '@lune/ui';

import type {
  CommonCustomFieldDefinitionFragment,
  CommonListProductFragment
} from '@/lib/api/types';
import { useGetProducts } from '@/lib/product/hooks/use-get-products';
import { EntitySelector } from '@/shared/components/entity-selector/entity-selector';
import { DefaultEntitySelectorRow } from '@/shared/components/entity-selector/rows/default-entity-selector-row';

export const ProductReferenceCustomField = ({ definition, onChange }: Props) => {
  const { isLoading, products: allProducts } = useGetProducts();

  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<CommonListProductFragment[]>([]);

  const products = useMemo(
    () => allProducts.filter(p => p.name.toLowerCase().includes(query.toLowerCase())),
    [allProducts]
  );

  return (
    <div className="flex items-center gap-4">
      <Label className="w-full">{definition.name}</Label>

      <EntitySelector
        title="Add products"
        description="Add products to your collection"
        trigger={
          <div
            className={cn(
              'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
              'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
              'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
              'w-3/4 shrink-0 px-1 flex items-center gap-1'
            )}
          >
            {selected.map(p => (
              <Badge variant={'secondary'} className="bg-background/75">
                <img src={p.assets.items[0]?.source} alt={p.name} className="w-5 h-5 rounded" />
                {p.name.length > 15 ? `${p.name.slice(0, 15)}...` : p.name}
              </Badge>
            ))}
          </div>
        }
        items={products}
        isLoading={isLoading}
        defaultSelected={[]}
        onSearch={setQuery}
        getRowId={item => item.id}
        onDone={selected => {
          setSelected(selected);
          onChange(selected.map(s => s.id));
          return true;
        }}
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
    </div>
  );
};

type Props = {
  onChange: (productIds: string[]) => void;
  definition: CommonCustomFieldDefinitionFragment;
};
