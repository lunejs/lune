import { useEffect, useMemo, useState } from 'react';
import { EyeIcon } from 'lucide-react';

import { Label } from '@lune/ui';

import type {
  CommonCustomFieldDefinitionFragment,
  CommonListProductFragment
} from '@/lib/api/types';
import { useGetProducts } from '@/lib/product/hooks/use-get-products';
import { EntitySelector } from '@/shared/components/entity-selector/entity-selector';
import { DefaultEntitySelectorRow } from '@/shared/components/entity-selector/rows/default-entity-selector-row';

import { CustomFieldEntityPreview } from './shared/preview/custom-field-entity-preview';
import { CustomFieldPreviewContainer } from './shared/preview/custom-field-preview-container';

export const ProductReferenceCustomField = ({ defaultValues, definition, onChange }: Props) => {
  const { isLoading, products: allProducts } = useGetProducts();

  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<CommonListProductFragment[]>([]);

  const products = useMemo(
    () => allProducts.filter(p => p.name.toLowerCase().includes(query.toLowerCase())),
    [allProducts]
  );

  useEffect(() => {
    if (defaultValues) setSelected(allProducts.filter(p => defaultValues.includes(p.id)));
  }, [allProducts]);

  return (
    <div className="group grid grid-cols-1 items-center gap-2 md:grid-cols-[25%_1fr] md:gap-4">
      <Label className="w-full">{definition.name}</Label>

      <EntitySelector
        title="Add products"
        description="Add products to your collection"
        trigger={
          <CustomFieldPreviewContainer>
            {selected.map(p => (
              <CustomFieldEntityPreview
                key={p.id}
                title={p.name}
                image={p.assets.items[0]?.source}
              />
            ))}
            {!!selected.length && (
              <button
                type="button"
                className="opacity-0 absolute right-0 w-8 flex justify-center items-center h-full bg-accent group-hover:opacity-100 transition-opacity before:absolute before:-left-4 before:top-0 before:h-full before:w-4 before:bg-linear-to-r before:from-transparent before:to-accent before:pointer-events-none"
                onClick={e => {
                  e.stopPropagation();
                  // TODO: add preview for entities
                }}
              >
                <EyeIcon size={16} />
              </button>
            )}
          </CustomFieldPreviewContainer>
        }
        items={products}
        isLoading={isLoading}
        defaultSelected={selected}
        onSearch={setQuery}
        getRowId={item => item.id}
        onDone={selected => {
          // Remove this once add max prop
          const newSelected = definition.isList ? selected : selected[0] ? [selected[0]] : [];

          setSelected(newSelected);

          const ids = newSelected.map(s => s.id);

          if (definition.isList) onChange(ids.length ? ids : null);
          else onChange(newSelected[0]?.id ?? null);

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
  defaultValues?: string[];
  onChange: (productIds: null | string | string[]) => void;
  definition: CommonCustomFieldDefinitionFragment;
};
