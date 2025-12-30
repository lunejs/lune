import { Card, CardContent, CardHeader, CardTitle, FormInput } from '@lunejs/ui';

import { useVariantDetailsFormContext } from '../use-form/use-form';

export const StockVariantCard = () => {
  const form = useVariantDetailsFormContext();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stock</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 items-start sm:flex-row">
        <FormInput
          type="number"
          control={form.control}
          name="stock"
          label="Quantity"
          placeholder="0"
        />
        <FormInput control={form.control} name="sku" label="SKU" placeholder="SKU-123" />
      </CardContent>
    </Card>
  );
};
