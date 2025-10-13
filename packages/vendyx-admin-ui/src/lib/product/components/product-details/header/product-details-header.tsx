import { Button, H1 } from '@vendyx/ui';

import { useProductDetailsFormContext } from '../use-product-details-form';

export const ProductDetailsHeader = () => {
  const { product, ...form } = useProductDetailsFormContext();

  return (
    <header className="flex items-center justify-between">
      <H1 className="font-bold text-2xl">{product ? product.name : 'Add product'}</H1>
      <Button
        type="submit"
        isLoading={form.formState.isSubmitting}
        disabled={!form.formState.isDirty || form.formState.isSubmitting}
      >
        Save
      </Button>
    </header>
  );
};
