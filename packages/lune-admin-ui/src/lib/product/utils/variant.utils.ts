import type { VariantContext } from '../components/product-details/variants/variants.context';

/**
 * Get all variants grouped by the provided option.
 */
export const getVariantsGroupedByOption = (
  option: VariantContext['options'][0],
  variants: VariantContext['variants']
) => {
  const groups: Record<string, VariantContext['variants'][0][]> = {};

  option?.values
    ?.filter(v => v.name)
    .forEach(v => {
      const variantsWithCurrentValue = variants.filter(variant =>
        variant.values?.map(v => v.id).includes(v.id)
      );

      groups[v.name] = variantsWithCurrentValue;
    });

  return groups;
};

/**
 * Get all option values that are not used in any variant.
 */
export const getUnusedOptionValues = (
  option: VariantContext['options'],
  variants: VariantContext['variants']
) => {
  const usedValues = variants.flatMap(v => v.values.map(v => v.id));
  const unusedValues = option.flatMap(o => o.values).filter(v => !usedValues.includes(v.id));

  return unusedValues;
};
