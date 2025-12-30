/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { formatPrice, isTruthy } from '@lunejs/common';

import type { CommonProductFragment } from '@/lib/api/types';
import { useGetOptionValueCustomObjects } from '@/lib/custom-fields/hooks/use-get-option-value-custom-objects';
import { getUnusedOptionValues } from '@/lib/product/utils/variant.utils';

type CustomObjectDefinition = ReturnType<
  typeof useGetOptionValueCustomObjects
>['customObjects'][number];

import { useProductDetailsFormContext } from '../use-form/use-product-details-form';

export type VariantContext = {
  options: {
    id: string;
    isEditing: boolean;
    customObjectId?: string;
    name: string;
    values: { name: string; id: string; customObjectEntryId?: string }[];
  }[];
  variants: {
    id: string;
    values: { name: string; id: string }[];
    price: string;
    stock: number;
    comparisonPrice: string;
    sku: string;
    requiresShipping: boolean;
    weight: number;
    height: number;
    width: number;
    length: number;
    selected: boolean;
    action: 'create' | 'update' | 'none';
  }[];
  product?: CommonProductFragment;
  customObjects: CustomObjectDefinition[];
  updateVariants: (variants: VariantContext['variants']) => void;
  removeVariants: (ids: string[]) => void;
  appendOption: (customObjectId?: string) => void;
  updateOption: (id: string, input: VariantContext['options'][0]) => void;
  removeOption: (id: string) => void;
};

const Context = createContext<VariantContext>({
  options: [],
  variants: [],
  product: undefined,
  customObjects: [],
  updateVariants: () => {},
  removeVariants: () => {},
  appendOption: () => {},
  updateOption: () => {},
  removeOption: () => {}
});

export const VariantContextProvider = ({
  children,
  product
}: {
  children: ReactNode;
  product: CommonProductFragment | undefined;
}) => {
  const { customObjects } = useGetOptionValueCustomObjects();
  const { setValue } = useProductDetailsFormContext();
  const baseOptions: VariantContext['options'] = useMemo(() => {
    return (
      product?.options.map(o => {
        // Find which custom object this option uses by checking the entry's definition
        const customObjectIdsInThisOption = o.values
          .map(ov => ov.customObjectEntry?.definition?.id)
          .filter(isTruthy);

        const customObject = customObjects.find(co => customObjectIdsInThisOption.includes(co.id));

        return {
          id: o.id,
          isEditing: false,
          name: o.name,
          customObjectId: customObject?.id,
          values: o.values.map(v => ({
            id: v.id,
            name: v.name,
            customObjectEntryId: v.customObjectEntry?.id
          }))
        };
      }) ?? []
    );
  }, [product?.options, customObjects]);

  const baseVariants: VariantContext['variants'] =
    product?.variants.items
      .map(v => ({
        id: v.id,
        values: v.optionValues.map(v => ({
          id: v.id,
          name: v.name
        })),
        price: v.salePrice ? formatPrice(v.salePrice) : '',
        comparisonPrice: v.comparisonPrice ? formatPrice(v.comparisonPrice) : '',
        stock: v.stock,
        sku: v.sku ?? '',
        requiresShipping: v.requiresShipping ?? false,
        weight: v.weight ?? 0,
        height: v.dimensions?.height ?? 0,
        width: v.dimensions?.width ?? 0,
        length: v.dimensions?.length ?? 0,
        selected: false,
        action: 'none' as const
      }))
      .filter(v => v.values.length) ?? [];

  const [options, setOptions] = useState<VariantContext['options']>(baseOptions);
  const [variants, setVariants] = useState<VariantContext['variants']>(baseVariants);

  useEffect(
    function setBaseValuesWhenProductIsRefetch() {
      if (!product) return;

      setOptions(baseOptions);
      setVariants(baseVariants);
    },
    [product]
  );

  useEffect(
    function setBaseValuesWhenProductIsRefetch() {
      if (!product) return;

      setOptions(baseOptions);
    },
    [baseOptions]
  );

  useEffect(
    function setValuesInForm() {
      setValue(
        'options',
        options
          .filter(o => o.name)
          .map(op => ({
            id: op.id,
            name: op.name,
            values: op.values
          }))
      );

      setValue(
        'variants',
        variants.map(v => ({
          id: v.id,
          stock: v.stock,
          salePrice: v.price,
          optionValues: v.values,
          comparisonPrice: v.comparisonPrice,
          sku: v.sku,
          requiresShipping: v.requiresShipping,
          weight: v.weight,
          height: v.height,
          width: v.width,
          length: v.length,
          action: v.action
        }))
      );
    },
    [variants, options]
  );

  const updateVariants = (variants: VariantContext['variants']) => {
    setVariants(variants);
  };

  const removeVariants = (ids: string[]) => {
    const updatedVariants = variants.filter(v => !ids.includes(v.id));

    const unusedValues = getUnusedOptionValues(options, updatedVariants);
    const newOptions = options
      .map(o => ({
        ...o,
        values: o.values.filter(v => !unusedValues.map(uv => uv.id).includes(v.id))
      }))
      .filter(o => o.values.length);

    setVariants(updatedVariants);
    setOptions(newOptions);
  };

  const appendOption = (customObjectId?: string) => {
    if (options.length === MAX_OPTIONS_ALLOWED) return;

    const customObject = customObjects.find(co => co.id === customObjectId);

    setOptions([
      ...options,
      {
        id: Math.random().toString(),
        isEditing: true,
        customObjectId,
        name: customObject?.name ?? '',
        values: [{ id: Math.random().toString(), name: '' }]
      }
    ]);
  };

  const updateOption = (id: string, input: VariantContext['options'][0]) => {
    const updatedOptions = options.map(o => (o.id === id ? input : o));

    setOptions(updatedOptions);
  };

  const removeOption = (id: string) => {
    const updatedOptions = options.filter(o => o.id !== id);

    setOptions(updatedOptions);
  };

  return (
    <Context.Provider
      value={{
        options,
        customObjects,
        appendOption,
        updateOption,
        removeOption,
        variants,
        updateVariants,
        removeVariants,
        product
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useVariantContext = () => useContext(Context);

export const MAX_OPTIONS_ALLOWED = 3;
