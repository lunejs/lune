import { H1 } from '@lune/ui';

import { ProductActions } from '../actions/product-actions';
import { useProductDetailsFormContext } from '../use-form/use-product-details-form';

import { ProductSubmitButton } from './submit-button/product-submit-button';

export const ProductDetailsHeader = () => {
  const { product } = useProductDetailsFormContext();

  return (
    <header className="flex items-center justify-between">
      <H1 className="font-bold text-2xl text-left">{product ? product.name : 'Add product'}</H1>
      <div className="flex items-center gap-2">
        {product && <ProductActions product={product} />}
        <ProductSubmitButton />
      </div>
    </header>
  );
};
