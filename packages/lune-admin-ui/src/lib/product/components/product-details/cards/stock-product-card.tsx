import { Card, CardContent, CardHeader, CardTitle, FormInput } from '@lunejs/ui';

import { useProductDetailsFormContext } from '../use-form/use-product-details-form';

export const StockProductCard = () => {
  const form = useProductDetailsFormContext();

  return (
    <Card>
      <CardHeader className="flex">
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
