/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from 'react';

import { formatPrice, isTruthy } from '@lune/common';

import type { CommonOptionPresetFragment, CommonProductFragment } from '@/lib/api/types';
import { useGetOptionPresets } from '@/lib/option-preset/hooks/use-get-option-presets';
import { getUnusedOptionValues } from '@/lib/product/utils/variant.utils';

import { useProductDetailsFormContext } from '../use-form/use-product-details-form';

export type VariantContext = {
  options: {
    id: string;
    isEditing: boolean;
    presetId?: string;
    name: string;
    values: { name: string; id: string; presetId?: string }[];
  }[];
  variants: {
    id: string;
    values: { name: string; id: string }[];
    price: string;
    stock: number;
    selected: boolean;
    action: 'create' | 'update' | 'none'; // ← SOLO ESTE CAMPO
  }[];
  product?: CommonProductFragment;
  presets: CommonOptionPresetFragment[];
  updateVariants: (variants: VariantContext['variants']) => void;
  removeVariants: (ids: string[]) => void;
  appendOption: (presetId?: string) => void;
  updateOption: (id: string, input: VariantContext['options'][0]) => void;
  removeOption: (id: string) => void;
};

const Context = createContext<VariantContext>({
  options: [],
  variants: [],
  product: undefined,
  presets: [],
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
  const { optionPresets } = useGetOptionPresets();
  const { setValue } = useProductDetailsFormContext();
  const baseOptions: VariantContext['options'] = useMemo(() => {
    return (
      product?.options.map(o => {
        const presetValueIds = o.values.map(ov => ov.preset?.id).filter(isTruthy);

        const preset = optionPresets.find(preset =>
          preset.values.items.map(pv => pv.id).some(pvId => presetValueIds.includes(pvId))
        );

        return {
          id: o.id,
          isEditing: false,
          name: o.name,
          presetId: preset?.id,
          values: o.values.map(v => ({
            id: v.id,
            name: v.name,
            presetId: v.preset?.id
          }))
        };
      }) ?? []
    );
  }, [product?.options, optionPresets]);

  const baseVariants: VariantContext['variants'] =
    product?.variants.items
      .map(v => ({
        id: v.id,
        values: v.optionValues.map(v => ({
          id: v.id,
          name: v.name
        })),
        price: v.salePrice ? formatPrice(v.salePrice) : '',
        stock: v.stock,
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

  const appendOption = (presetId?: string) => {
    if (options.length === MAX_OPTIONS_ALLOWED) return;

    const preset = optionPresets.find(p => p.id === presetId);

    setOptions([
      ...options,
      {
        id: Math.random().toString(),
        isEditing: true,
        presetId,
        name: preset?.name ?? '',
        values: [{ id: Math.random().toString(), name: '' }]
      }
    ]);

    return;

    // setOptions([...options, option]);
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
        presets: optionPresets,
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
