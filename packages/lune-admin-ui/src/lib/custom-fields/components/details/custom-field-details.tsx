import { Form, FormSelect } from '@lunejs/ui';

import type {
  CommonCustomFieldDefinitionFragment,
  CustomFieldAppliesToEntity
} from '@/lib/api/types';
import { SettingsPageLayout } from '@/shared/components/layout/settings-page-layout';

import { CUSTOM_FIELD_TYPE_GROUPS, getEntityName } from '../../utils/custom-field.utils';

import { CustomFieldActions } from './actions/custom-field-actions';
import { CustomFieldIsList } from './is-list/custom-field-is-list';
import { CustomFieldName } from './name/custom-field-name';
import { CustomFieldTargetReference } from './target-reference/custom-field-target-reference';
import { CustomFieldSubmitButton } from './use-form/submit-button';
import { useCustomFieldForm } from './use-form/use-form';

export const CustomFieldDetails = ({ entity, definition }: Props) => {
  const form = useCustomFieldForm(entity, definition);

  return (
    <Form {...form}>
      <form onSubmit={form.onSubmit}>
        <SettingsPageLayout
          title={
            definition
              ? definition.name
              : `Add ${getEntityName(entity).toLowerCase()} custom fields`
          }
          subtitle={definition && `${getEntityName(entity)} custom field`}
          backUrl={`/settings/custom-fields/${entity}`}
          actions={
            <div className="flex items-center gap-4">
              {definition && <CustomFieldActions definition={definition} entity={entity} />}
              <CustomFieldSubmitButton />
            </div>
          }
          className="flex flex-col gap-4"
        >
          <CustomFieldName />

          <div className="flex items-end gap-4 flex-wrap">
            <CustomFieldIsList />

            <FormSelect
              disabled={!!definition}
              control={form.control}
              name="type"
              placeholder="Select a type"
              groups={CUSTOM_FIELD_TYPE_GROUPS}
              className="flex-1"
            />

            <CustomFieldTargetReference />
          </div>
        </SettingsPageLayout>
      </form>
    </Form>
  );
};

type Props = {
  definition?: CommonCustomFieldDefinitionFragment;
  entity: CustomFieldAppliesToEntity;
};
