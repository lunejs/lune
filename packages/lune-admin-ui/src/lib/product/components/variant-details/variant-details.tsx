import { Button, Form, H3 } from '@lune/ui';

import type { CommonVariantFragment } from '@/lib/api/types';

import { AssetsVariantCard } from './cards/assets-variant-card';
import { PricingVariantCard } from './cards/pricing-variant-card';
import { StockVariantCard } from './cards/stock-variant-card';
import { ReplaceVariantSheet } from './replace-variant/replace-variant-sheet';
import { ShippingVariantCard } from './shipping/shipping-product-card';
import { useVariantDetailsForm } from './use-form/use-form';

export const VariantDetails = ({ productId, variant, variants }: Props) => {
  const form = useVariantDetailsForm(productId, variant);

  const variantName = variant?.optionValues.map(ov => ov.name).join(' / ');

  return (
    <Form {...form}>
      <form onSubmit={form.onSubmit} className="flex flex-col gap-6">
        <header className="flex items-center justify-between">
          <H3>{variantName}</H3>
          <div className="flex items-center gap-2">
            <ReplaceVariantSheet variants={variants} />
            <Button disabled={!form.formState.isDirty || form.formState.isSubmitting}>Save</Button>
          </div>
        </header>
        <div className="flex flex-col gap-6">
          <AssetsVariantCard />
          <PricingVariantCard />
          <StockVariantCard />
          <ShippingVariantCard />
        </div>
      </form>
    </Form>
  );
};

type Props = {
  productId: string;
  variant: CommonVariantFragment;
  variants: CommonVariantFragment[];
};
