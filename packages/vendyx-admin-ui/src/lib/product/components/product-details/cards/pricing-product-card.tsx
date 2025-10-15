import { Card, CardContent, CardHeader, CardTitle, FormInput } from '@vendyx/ui';

import { useProductDetailsFormContext } from '../use-form/use-product-details-form';

export const PricingProductCard = () => {
  const form = useProductDetailsFormContext();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pricing</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 items-start sm:flex-row">
        <FormInput
          control={form.control}
          name="salePrice"
          label="Sale price"
          placeholder="$ 0.00"
        />
        <FormInput
          control={form.control}
          name="comparisonPrice"
          label="Comparison price"
          placeholder="$ 0.00"
        />
      </CardContent>
    </Card>
  );
};
