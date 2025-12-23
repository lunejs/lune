import { Form } from '@lune/ui';

import type { CommonCustomFieldDefinitionFragment, CommonProductFragment } from '@/lib/api/types';

import { GeneralProductCard } from './cards/general-product-card';
import { PricingProductCard } from './cards/pricing-product-card';
import { StatusProductCard } from './cards/status-product-card';
import { StockProductCard } from './cards/stock-product-card';
import { ProductCustomFields } from './custom-fields/product-custom-fields';
import { ProductDetailsHeader } from './header/product-details-header';
import { ShippingProductCard } from './shipping/shipping-product-card';
import { useProductDetailsForm } from './use-form/use-product-details-form';
import { ProductVariants } from './variants/product-variants';
import { VariantContextProvider } from './variants/variants.context';

export const ProductDetails = ({ customFields, product }: Props) => {
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

            {!!customFields.length && (
              <ProductCustomFields product={product} customFieldDefinitions={customFields} />
            )}
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
  customFields: CommonCustomFieldDefinitionFragment[];
  product?: CommonProductFragment | null;
};
