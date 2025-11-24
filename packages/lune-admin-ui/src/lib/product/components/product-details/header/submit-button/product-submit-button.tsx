import { type DeepPartial, useWatch } from 'react-hook-form';

import { equals, LunePrice } from '@lune/common';
import { Button } from '@lune/ui';

import type { CommonProductFragment } from '@/lib/api/types';

import {
  type ProductDetailsFormInput,
  useProductDetailsFormContext
} from '../../use-form/use-product-details-form';

export const ProductSubmitButton = () => {
  const { product, ...form } = useProductDetailsFormContext();
  const values = useWatch({ defaultValue: form.getValues() });

  const variantsHasChanged = getVariantsHasChanged(values, product);
  const optionsHasChanged = getOptionsHasChanged(values, product);

  return (
    <Button
      type="submit"
      disabled={
        !(form.formState.isDirty || variantsHasChanged || optionsHasChanged) ||
        form.formState.isSubmitting ||
        !values.name
      }
    >
      Save
    </Button>
  );
};

const getVariantsHasChanged = (
  values: DeepPartial<ProductDetailsFormInput>,
  product: CommonProductFragment | null
) => {
  if (
    values.variants?.length !== product?.variants.items.length &&
    product?.variants.items?.length !== 1
  ) {
    return true;
  }

  return values?.variants?.some(v => {
    if (!v) return false;

    const persistedVariant = product?.variants.items.find(dv => dv.id === v?.id);

    const persisted = {
      salePrice: persistedVariant?.salePrice,
      stock: persistedVariant?.stock
    };

    const inMemoryVariant = {
      salePrice: LunePrice.toCent(LunePrice.parse(v.salePrice || '0')) || 0,
      stock: v.stock
    };

    return !equals(inMemoryVariant, persisted);
  });
};

const getOptionsHasChanged = (
  values: DeepPartial<ProductDetailsFormInput>,
  product: CommonProductFragment | null
) => {
  if (values.options?.length !== product?.options.length) return true;

  return values.options?.some(o => {
    const persistedOption = product?.options.find(dv => dv.id === o?.id);
    const nameIsDifferent = o?.name !== persistedOption?.name;

    const valueContentIsDifferent = o?.values
      ?.filter(v => v?.name)
      .some(v => {
        const persistedValue = persistedOption?.values.find(pv => pv.id === v?.id);
        return v?.name !== persistedValue?.name;
      });

    return nameIsDifferent || valueContentIsDifferent;
  });
};
