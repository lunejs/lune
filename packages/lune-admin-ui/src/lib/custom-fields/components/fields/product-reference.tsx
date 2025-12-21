import { useMemo, useState } from 'react';

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
          <CustomFieldPreviewContainer>
            {selected.map(p => (
              <CustomFieldEntityPreview title={p.name} image={p.assets.items[0]?.source} />
            ))}
          </CustomFieldPreviewContainer>
        }
        items={products}
        isLoading={isLoading}
        defaultSelected={selected}
        onSearch={setQuery}
        getRowId={item => item.id}
        onDone={selected => {
          const newSelected = definition.isList ? selected : [selected[0]];

          setSelected(newSelected);
          onChange(newSelected.map(s => s.id));
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
