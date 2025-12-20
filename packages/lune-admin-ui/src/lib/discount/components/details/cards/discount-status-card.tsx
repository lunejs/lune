import { Card, CardContent, CardHeader, CardTitle, FormSwitch } from '@lune/ui';

import { useDiscountDetailsFormContext } from '../use-form/use-form';

export const DiscountStatusCard = () => {
  const { control } = useDiscountDetailsFormContext();

  return (
    <Card>
      <CardHeader className="flex">
        <CardTitle>Status</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <FormSwitch control={control} name="enabled" label="Enabled" />
      </CardContent>
    </Card>
  );
};
