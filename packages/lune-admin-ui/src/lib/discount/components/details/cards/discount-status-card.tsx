import { Card, CardContent, CardHeader, CardTitle, FormSwitch } from '@lune/ui';

import { useDiscountDetailsFormContext } from '../use-form/use-form';

export const DiscountStatusCard = () => {
  const { control } = useDiscountDetailsFormContext();

  return (
    <Card>
      <CardHeader>
        <CardTitle>General</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <FormSwitch control={control} name="enabled" label="Enabled" />
      </CardContent>
    </Card>
  );
};
