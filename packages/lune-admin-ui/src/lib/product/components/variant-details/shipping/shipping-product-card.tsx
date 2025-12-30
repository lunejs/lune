import { Card, CardContent, CardHeader, CardTitle, FormCheckbox } from '@lunejs/ui';

import { useVariantDetailsFormContext } from '../use-form/use-form';

import { VariantDimensions } from './variant-dimensions';

export const ShippingVariantCard = () => {
  const form = useVariantDetailsFormContext();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <FormCheckbox
          control={form.control}
          name="requiresShipping"
          label="This product requires shipping"
        />
        <VariantDimensions />
      </CardContent>
    </Card>
  );
};
