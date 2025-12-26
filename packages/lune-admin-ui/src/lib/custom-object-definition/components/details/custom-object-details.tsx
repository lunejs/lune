import { Form } from '@lune/ui';

import type { CommonCustomObjectDefinitionFragment } from '@/lib/api/types';
import { SettingsPageLayout } from '@/shared/components/layout/settings-page-layout';

import { CustomObjectDefinitionActions } from './actions/custom-object-definition-actions';
import { CustomObjectConfigurationCard } from './configuration/custom-object-configuration-card';
import { CustomObjectFields } from './fields/custom-object-fields';
import { CustomObjectGeneralCard } from './general/custom-object-general-card';
import { CustomObjectSubmitButton } from './use-form/submit-button';
import { useCustomObjectForm } from './use-form/use-form';

export const CustomObjectDetails = ({ definition }: Props) => {
  const form = useCustomObjectForm(definition ?? null);

  return (
    <Form {...form}>
      <form onSubmit={form.onSubmit}>
        <SettingsPageLayout
          title={definition?.name ?? 'Create custom object'}
          actions={
            <div className="flex items-center gap-4">
              {definition && <CustomObjectDefinitionActions definition={definition} />}
              <CustomObjectSubmitButton />
            </div>
          }
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
