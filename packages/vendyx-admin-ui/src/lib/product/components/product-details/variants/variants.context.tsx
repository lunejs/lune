/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, type ReactNode, useContext, useEffect, useState } from 'react';

import { formatPrice } from '@vendyx/common';

import type { CommonProductFragment } from '@/lib/api/types';
import { getUnusedOptionValues } from '@/lib/product/utils/variant.utils';

import { useProductDetailsFormContext } from '../use-product-details-form';

export type VariantContext = {
  options: {
    id: string;
    isEditing: boolean;
    name: string;
    values: { name: string; id: string; color?: string; translation?: string }[];
  }[];
  variants: {
    id: string;
    values: { name: string; id: string; color?: string; translation?: string }[];
    price: string;
    comparisonPrice?: string;
    stock: number;
    sku?: string;
    requiresShipping?: boolean;
    weight?: number | '';
    length?: number | '';
    width?: number | '';
    height?: number | '';
    image?: string;
    selected: boolean;
  }[];
  product?: CommonProductFragment;
  updateVariants: (variants: VariantContext['variants']) => void;
  removeVariants: (ids: string[]) => void;
  appendOption: (option?: VariantContext['options'][0]) => void;
  updateOption: (id: string, input: VariantContext['options'][0]) => void;
  removeOption: (id: string) => void;
};

const Context = createContext<VariantContext>({
  options: [],
  variants: [],
  product: undefined,
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
  const { setValue } = useProductDetailsFormContext();
  const baseOptions: VariantContext['options'] =
    product?.options.map(o => ({
      id: o.id,
      isEditing: false,
      name: o.name,
      values: o.values.map(v => ({
        id: v.id,
        name: v.name
        // color: v.metadata?.color,
        // translation: v.translation ?? ''
      }))
    })) ?? [];

  const baseVariants: VariantContext['variants'] =
    product?.variants.items
      .map(v => ({
        id: v.id,
        values: v.optionValues.map(v => ({
          id: v.id,
          name: v.name
          // color: v.metadata?.color,
          // translation: v.translation ?? ''
        })),
        price: formatPrice(v.salePrice),
        comparisonPrice: v.comparisonPrice ? formatPrice(v.comparisonPrice) : undefined,
        sku: v.sku ? v.sku : undefined,
        stock: v.stock,
        requiresShipping: v.requiresShipping,
        weight: v.weight ?? undefined,
        length: v.dimensions?.length ?? undefined,
        width: v.dimensions?.width ?? undefined,
        height: v.dimensions?.height ?? undefined,
        image: v.assets.items[0]?.source ?? undefined,
        selected: false
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
    function setValuesInForm() {
      setValue(
        'options',
        options.filter(o => o.name)
      );

      setValue(
        'variants',
        variants.map(v => ({
          id: v.id,
          stock: v.stock,
          salePrice: v.price,
          comparisonPrice: v.comparisonPrice,
          sku: v.sku,
          requiresShipping: v.requiresShipping ?? false,
          weight: v.weight,
          length: v.length,
          width: v.width,
          height: v.height,
          optionValues: v.values
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

  const appendOption = (option?: VariantContext['options'][0]) => {
    if (options.length === MAX_OPTIONS_ALLOWED) return;

    if (!option) {
      setOptions([
        ...options,
        {
          id: Math.random().toString(),
          isEditing: true,
          name: '',
          values: [{ id: Math.random().toString(), name: '' }]
        }
      ]);

      return;
    }

    setOptions([...options, option]);
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
