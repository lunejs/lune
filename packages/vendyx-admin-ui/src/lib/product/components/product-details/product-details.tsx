import { Form } from '@vendyx/ui';

import type { CommonProductFragment } from '@/lib/api/types';

import { GeneralProductCard } from './cards/general-product-card';
import { PricingProductCard } from './cards/pricing-product-card';
import { StatusProductCard } from './cards/status-product-card';
import { StockProductCard } from './cards/stock-product-card';
import { ProductDetailsHeader } from './header/product-details-header';
import { ShippingProductCard } from './shipping/shipping-product-card';
import { ProductVariants } from './variants/product-variants';
import { VariantContextProvider } from './variants/variants.context';
import { useProductDetailsForm } from './use-product-details-form';

export const ProductDetails = ({ product }: Props) => {
  const form = useProductDetailsForm(product);

  return (
    <Form {...form}>
      <form onSubmit={form.onSubmit} className="flex flex-col gap-6">
        <ProductDetailsHeader />
        <main className="flex flex-col gap-6 lg:grid grid-cols-6">
          <div className="col-span-4 flex flex-col gap-6">
            <GeneralProductCard />
            {!product?.options.length && (
              <>
                <PricingProductCard />
                <StockProductCard />
                <ShippingProductCard />
              </>
            )}
            <VariantContextProvider product={product ?? undefined}>
              <ProductVariants />
            </VariantContextProvider>
          </div>
          <div className="col-span-2 flex flex-col gap-6 w-full">
            <StatusProductCard />
          </div>
        </main>
      </form>
    </Form>
  );
};

type Props = {
  product?: CommonProductFragment | null;
};
