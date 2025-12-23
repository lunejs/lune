import { isArray } from '@lune/common';
import { Card, CardContent, CardHeader, CardTitle } from '@lune/ui';

import type {
  CommonCollectionFragment,
  CommonCustomFieldDefinitionFragment
} from '@/lib/api/types';
import { CustomField } from '@/lib/custom-fields/components/fields/custom-field';

import { useCollectionDetailsFormContext } from '../use-form/use-form';

export const CollectionCustomFields = ({ customFieldDefinitions, collection }: Props) => {
  const form = useCollectionDetailsFormContext();

  return (
    <Card>
      <CardHeader className="flex">
        <CardTitle>Custom fields</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {customFieldDefinitions.map(cf => {
          const entry = collection?.customFieldEntries.find(e => e.definition.id === cf.id);

          const defaultValue = entry
            ? isArray(entry?.value)
              ? entry.value
              : [entry?.value]
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
  );
};

type Props = {
  collection: CommonCollectionFragment | undefined | null;
  customFieldDefinitions: CommonCustomFieldDefinitionFragment[];
};
