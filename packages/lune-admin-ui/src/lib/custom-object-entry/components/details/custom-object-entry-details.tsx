import { isArray } from '@lune/common';
import { Button, Card, CardContent, CardHeader, CardTitle, Form } from '@lune/ui';

import type {
  CommonCustomObjectDefinitionFragment,
  CommonCustomObjectEntryFragment
} from '@/lib/api/types';
import { CustomField } from '@/lib/custom-fields/components/fields/custom-field';
import { DetailsPageLayout } from '@/shared/components/layout/details-page-layout';

import { useCustomObjectEntryForm } from './use-form/use-form';

export const CustomObjectEntryDetails = ({ definition, entry }: Props) => {
  const form = useCustomObjectEntryForm(definition, entry ?? null);

  const displayFieldValue = entry?.values.find(v => v.field.id === definition.displayField?.id);

  return (
    <Form {...form}>
      <form onSubmit={form.onSubmit}>
        <DetailsPageLayout>
          <DetailsPageLayout.Header>
            <DetailsPageLayout.Title>
              {entry ? displayFieldValue?.value : 'Create Entry'}
            </DetailsPageLayout.Title>
            <DetailsPageLayout.Actions>
              {/* {discount && <DiscountActions discount={discount} />} */}
              <Button>Save</Button>
            </DetailsPageLayout.Actions>
          </DetailsPageLayout.Header>

          <DetailsPageLayout.Content>
            <div className="col-span-4 flex flex-col gap-6">
              <Card>
                <CardHeader className="flex">
                  <CardTitle>General</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  {definition.fields.map(cf => {
                    const entryValue = entry?.values.find(e => e.field.id === cf.id);

                    const defaultValue = entry
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
