import { Card, CardContent, CardHeader, CardTitle, FormSwitch } from '@lunejs/ui';

import { useProductDetailsFormContext } from '../use-form/use-product-details-form';

export const StatusProductCard = () => {
  const form = useProductDetailsFormContext();

  return (
    <Card>
      <CardHeader className="flex">
        <CardTitle>Status</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <FormSwitch control={form.control} name="enabled" label="Published" />
      </CardContent>
    </Card>
  );
};
