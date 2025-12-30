import { isArray } from '@lunejs/common';
import { Card, CardContent, CardHeader, CardTitle, Form } from '@lunejs/ui';

import type {
  CommonCustomObjectDefinitionFragment,
  CommonCustomObjectEntryFragment
} from '@/lib/api/types';
import { CustomField } from '@/lib/custom-fields/components/fields/custom-field';
import { getDisplayFieldValue } from '@/lib/custom-fields/utils/custom-field.utils';
import { DetailsPageLayout } from '@/shared/components/layout/details-page-layout';

import { CustomObjectEntryActions } from './actions/custom-object-entry-actions';
import { CustomObjectEntrySubmitButton } from './use-form/submit-button';
import { useCustomObjectEntryForm } from './use-form/use-form';

export const CustomObjectEntryDetails = ({ definition, entry }: Props) => {
  const form = useCustomObjectEntryForm(definition, entry ?? null);

  return (
    <Form {...form}>
      <form onSubmit={form.onSubmit}>
        <DetailsPageLayout>
          <DetailsPageLayout.Header>
            <DetailsPageLayout.Title>
              {entry ? getDisplayFieldValue(entry, definition) : 'Create Entry'}
            </DetailsPageLayout.Title>
            <DetailsPageLayout.Actions>
              {entry && <CustomObjectEntryActions definition={definition} entry={entry} />}
              <CustomObjectEntrySubmitButton />
            </DetailsPageLayout.Actions>
          </DetailsPageLayout.Header>

          <DetailsPageLayout.Content>
            <div className="col-span-6 flex flex-col gap-6">
              <Card>
                <CardHeader className="flex">
                  <CardTitle>General</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  {definition.fields.map(cf => {
                    const entryValue = entry?.values.find(e => e.field.id === cf.id);

                    const defaultValue = entryValue
                      ? isArray(entryValue?.value)
                        ? entryValue.value
                        : [entryValue?.value]
                      : undefined;

                    return (
                      <CustomField
                        key={cf.id}
                        definition={cf}
                        defaultValues={defaultValue}
                        onChange={(definition, value) =>
                          form.setValue('customFields', {
                            ...form.getValues('customFields'),
                            [definition.id]: value
                          })
                        }
                      />
                    );
                  })}
                </CardContent>
              </Card>
            </div>
            <div className="col-span-2 flex flex-col gap-6">{/* <DiscountStatusCard /> */}</div>
          </DetailsPageLayout.Content>
        </DetailsPageLayout>
      </form>
    </Form>
  );
};

type Props = {
  definition: CommonCustomObjectDefinitionFragment;
  entry?: CommonCustomObjectEntryFragment | null;
};
