import { Card, CardContent, CardHeader, CardTitle, FormCheckbox } from '@vendyx/ui';

import { useProductDetailsFormContext } from '../use-product-details-form';

import { ProductDimensions } from './product-dimensions';

export const ShippingProductCard = () => {
  const form = useProductDetailsFormContext();

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
        <ProductDimensions />
      </CardContent>
    </Card>
  );
};
