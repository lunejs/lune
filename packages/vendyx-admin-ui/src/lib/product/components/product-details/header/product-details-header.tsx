import { H1 } from '@vendyx/ui';

import { useProductDetailsFormContext } from '../use-product-details-form';

import { ProductSubmitButton } from './submit-button/product-submit-button';

export const ProductDetailsHeader = () => {
  const { product } = useProductDetailsFormContext();

  return (
    <header className="flex items-center justify-between">
      <H1 className="font-bold text-2xl">{product ? product.name : 'Add product'}</H1>
      <ProductSubmitButton />
    </header>
  );
};
