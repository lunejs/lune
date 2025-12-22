import { isArray } from '@lune/common';
import { Card, CardContent, CardHeader, CardTitle, Form } from '@lune/ui';

import type { CommonCustomFieldDefinitionFragment, CommonProductFragment } from '@/lib/api/types';
import { CustomField } from '@/lib/custom-fields/components/fields/custom-field';

import { GeneralProductCard } from './cards/general-product-card';
import { PricingProductCard } from './cards/pricing-product-card';
import { StatusProductCard } from './cards/status-product-card';
import { StockProductCard } from './cards/stock-product-card';
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
            {customFields.length && (
              <Card>
                <CardHeader className="flex">
                  <CardTitle>Custom fields</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  {customFields.map(cf => {
                    const entry = product?.customFieldEntries.find(e => e.definition.id === cf.id);

                    const defaultValue = entry
                      ? isArray(entry?.value)
                        ? entry.value
                        : [entry?.value]
                      : undefined;

                    return (
                      <CustomField
                        key={cf.id}
                        definition={cf}
                        defaultValues={defaultValue}
                        onChange={(definition, value) =>
                          form.setValue('customFields', {
                            ...form.getValues('customFields'),
                            [definition.id]: value
                          })
                        }
                      />
                    );
                  })}
                </CardContent>
              </Card>
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
