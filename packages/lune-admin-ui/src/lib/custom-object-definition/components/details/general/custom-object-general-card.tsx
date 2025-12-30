import { getSlugBy } from '@lunejs/common';
import { Card, CardContent, CardHeader, CardTitle, FormInput } from '@lunejs/ui';

import { useCustomObjectFormContext } from '../use-form/use-form';

export const CustomObjectGeneralCard = () => {
  const form = useCustomObjectFormContext();

  const name = form.watch('name');

  return (
    <Card>
      <CardHeader className="flex">
        <CardTitle>General</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <FormInput
            control={form.control}
            name="name"
            label="Name"
            placeholder="Banner, Author, Testimonial"
            description={form.definition ? form.definition.key : name && `key: ${getSlugBy(name)}`}
          />
        </div>
      </CardContent>
    </Card>
  );
};
