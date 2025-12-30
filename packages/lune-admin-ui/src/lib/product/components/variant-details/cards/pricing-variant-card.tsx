import { Card, CardContent, CardHeader, CardTitle, FormInput } from '@lunejs/ui';

import { useVariantDetailsFormContext } from '../use-form/use-form';

export const PricingVariantCard = () => {
  const form = useVariantDetailsFormContext();

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
