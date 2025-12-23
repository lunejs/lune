import { isArray } from '@lune/common';
import { Card, CardContent, CardHeader, CardTitle } from '@lune/ui';

import type { CommonCustomFieldDefinitionFragment, CommonProductFragment } from '@/lib/api/types';
import { CustomField } from '@/lib/custom-fields/components/fields/custom-field';

import { useProductDetailsForm } from '../use-form/use-product-details-form';

export const ProductCustomFields = ({ customFieldDefinitions, product }: Props) => {
  const form = useProductDetailsForm();

  return (
    <Card>
      <CardHeader className="flex">
        <CardTitle>Custom fields</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {customFieldDefinitions.map(cf => {
          const entry = product?.customFieldEntries.find(e => e.definition.id === cf.id);

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
  product: CommonProductFragment | undefined | null;
  customFieldDefinitions: CommonCustomFieldDefinitionFragment[];
};
