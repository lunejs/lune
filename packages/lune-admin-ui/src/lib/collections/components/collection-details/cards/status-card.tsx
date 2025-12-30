import { Card, CardContent, CardHeader, CardTitle, FormSwitch } from '@lunejs/ui';

import { useCollectionDetailsFormContext } from '../use-form/use-form';

export const CollectionStatusCard = () => {
  const form = useCollectionDetailsFormContext();

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
