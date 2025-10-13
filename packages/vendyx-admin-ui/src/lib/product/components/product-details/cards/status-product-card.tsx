import { Card, CardContent, CardHeader, CardTitle, FormSwitch } from '@vendyx/ui';

import { useProductDetailsFormContext } from '../use-product-details-form';

export const StatusProductCard = () => {
  const form = useProductDetailsFormContext();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Status</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <FormSwitch control={form.control} name="enabled" label="Published" />
      </CardContent>
    </Card>
  );
};
