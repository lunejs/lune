import { useEffect, useMemo, useState } from 'react';
import { EyeIcon, Package } from 'lucide-react';
import { Link } from 'react-router';

import { LunePrice } from '@lune/common';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Label,
  Muted,
  Small
} from '@lune/ui';

import type {
  CommonCustomFieldDefinitionFragment,
  CommonListProductFragment
} from '@/lib/api/types';
import { useGetProducts } from '@/lib/product/hooks/use-get-products';
import { EntitySelector } from '@/shared/components/entity-selector/entity-selector';
import { DefaultEntitySelectorRow } from '@/shared/components/entity-selector/rows/default-entity-selector-row';
import { ImagePlaceholder } from '@/shared/components/placeholders/image-placeholder';

import { CustomFieldEntityPreview } from './shared/preview/custom-field-entity-preview';
import { CustomFieldPreviewContainer } from './shared/preview/custom-field-preview-container';

export const ProductReferenceCustomField = ({ defaultValues, definition, onChange }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
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
                  setIsOpen(true);
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

      <Dialog isOpen={isOpen} setIsOpen={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{definition.name}</DialogTitle>
            <DialogDescription className="flex items-center gap-1">
              <Package size={16} />
              Products
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            {selected.map(p => (
              <div key={p.id} className="flex items-center gap-2">
                {p.assets.items[0]?.source ? (
                  <img
                    src={p.assets.items[0]?.source}
                    alt={p.name}
                    className="w-12 h-12 rounded-md object-cover"
                  />
                ) : (
                  <ImagePlaceholder initial={p.name} />
                )}
                <div>
                  <Link to={`/products/${p.id}`}>
                    <Small className="hover:underline">{p.name}</Small>
                  </Link>
                  <Muted>{LunePrice.format(p.minSalePrice)}</Muted>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

type Props = {
  defaultValues?: string[];
  onChange: (productIds: null | string | string[]) => void;
  definition: CommonCustomFieldDefinitionFragment;
};

// TODO:
// Add money custom field
// Add custom fields to collections
// Add custom fields to customers
// Fields can be modified from storefront
// Add custom objects
