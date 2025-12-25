import { Button, Form } from '@lune/ui';

import type { CommonCustomObjectDefinitionFragment } from '@/lib/api/types';
import { SettingsPageLayout } from '@/shared/components/layout/settings-page-layout';

import { CustomObjectConfigurationCard } from './configuration/custom-object-configuration-card';
import { CustomObjectFields } from './fields/custom-object-fields';
import { CustomObjectGeneralCard } from './general/custom-object-general-card';
import { useCustomObjectForm } from './use-form/use-form';

export const CustomObjectDetails = ({ definition }: Props) => {
  const form = useCustomObjectForm(definition ?? null);

  return (
    <Form {...form}>
      <form onSubmit={form.onSubmit}>
        <SettingsPageLayout
          title={definition?.name ?? '"Create custom object"'}
          actions={<Button>Save</Button>}
          className="flex flex-col gap-4"
        >
          <CustomObjectGeneralCard />
          <CustomObjectFields />
          <CustomObjectConfigurationCard />
        </SettingsPageLayout>
      </form>
    </Form>
  );
};

type Props = {
  definition?: CommonCustomObjectDefinitionFragment | null;
};
