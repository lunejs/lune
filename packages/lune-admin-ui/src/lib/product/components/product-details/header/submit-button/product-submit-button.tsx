import { equals, LunePrice } from '@lunejs/common';
import { Button } from '@lunejs/ui';
import { type DeepPartial, useWatch } from 'react-hook-form';

import type { CommonProductFragment } from '@/lib/api/types';

import {
  type ProductDetailsFormInput,
  useProductDetailsFormContext
} from '../../use-form/use-product-details-form';

export const ProductSubmitButton = () => {
  const { product, ...form } = useProductDetailsFormContext();
  const values = useWatch({ defaultValue: form.getValues() });

  const generalInfoHasChanged = getGeneralInfoHasChanged(values, product);
  const variantsHasChanged = getVariantsHasChanged(values, product);
  const optionsHasChanged = getOptionsHasChanged(values, product);
  const customFieldsHasChanged = getCustomFieldsHasChanged(values, product);

  return (
    <Button
      type="submit"
      disabled={
        !(
          generalInfoHasChanged ||
          variantsHasChanged ||
          optionsHasChanged ||
          form.formState.isDirty ||
          customFieldsHasChanged
        ) ||
        form.formState.isSubmitting ||
        !values.name
      }
    >
      Save
    </Button>
  );
};

const getGeneralInfoHasChanged = (
  values: DeepPartial<ProductDetailsFormInput>,
  product: CommonProductFragment | null
) => {
  const persisted = {
    name: product?.name,
    enabled: product?.enabled,
    description: product?.description
  };

  const form = {
    name: values?.name,
    enabled: values?.enabled,
    description: values?.description
  };

  return !equals(persisted, form);
};

const getCustomFieldsHasChanged = (
  values: DeepPartial<ProductDetailsFormInput>,
  product: CommonProductFragment | null
) => {
  const formCustomFields = values.customFields ?? {};
  const productCustomFields =
    product?.customFieldEntries.reduce(
      (prev, curr) => ({ ...prev, [curr.definition.id]: curr.value }),
      {}
    ) ?? {};

  return !equals(formCustomFields, productCustomFields);
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
