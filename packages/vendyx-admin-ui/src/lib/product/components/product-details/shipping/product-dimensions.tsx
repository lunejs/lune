import { FormInput } from '@vendyx/ui';

import { useProductDetailsFormContext } from '../use-form/use-product-details-form';

export const ProductDimensions = () => {
  const form = useProductDetailsFormContext();

  const requiresShipping = form.watch('requiresShipping');

  if (!requiresShipping) return null;

  return (
    <div className="mt-3 grid grid-cols-1 gap-3 justify-between items-start sm:grid-cols-2">
      <FormInput
        type="number"
        control={form.control}
        name="weight"
        label="Weight (kg)"
        placeholder="0.0"
      />
      <FormInput
        type="number"
        control={form.control}
        name="width"
        label="Width (cm)"
        placeholder="0.0"
      />
      <FormInput
        type="number"
        control={form.control}
        name="length"
        label="Length (cm)"
        placeholder="0.0"
      />
      <FormInput
        type="number"
        control={form.control}
        name="height"
        label="Height (cm)"
        placeholder="0.0"
      />
    </div>
  );
};
