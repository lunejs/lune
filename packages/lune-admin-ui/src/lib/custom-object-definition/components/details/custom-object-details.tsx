import { Form } from '@lune/ui';

import { CustomObjectConfigurationCard } from './configuration/custom-object-configuration-card';
import { CustomObjectFields } from './fields/custom-object-fields';
import { CustomObjectGeneralCard } from './general/custom-object-general-card';
import { useCustomObjectForm } from './use-form/use-form';

export const CustomObjectDetails = () => {
  const form = useCustomObjectForm();

  return (
    <Form {...form}>
      <form onSubmit={form.onSubmit} className="flex flex-col gap-4">
        <CustomObjectGeneralCard />
        <CustomObjectFields />
        <CustomObjectConfigurationCard />
      </form>
    </Form>
  );
};
