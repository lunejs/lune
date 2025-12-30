import { equals } from '@lunejs/common';
import { Button } from '@lunejs/ui';
import { useWatch } from 'react-hook-form';

import { useCustomObjectFormContext } from './use-form';

export const CustomObjectSubmitButton = () => {
  const form = useCustomObjectFormContext();
  const formValues = useWatch({ defaultValue: form.getValues() });

  const customObject = {
    name: form.definition?.name,
    displayFieldName: form.definition?.displayField?.name ?? null,
    fields: form.definition?.fields.map((field, i) => ({
      name: field.name,
      order: i
    }))
  };

  const values = {
    name: formValues?.name,
    displayFieldName:
      formValues?.displayField === 'auto' ? null : (formValues?.displayField ?? null),
    fields: formValues?.fields?.map((field, i) => ({
      name: field.name,
      order: i
    }))
  };

  const withRequiredValues = !!values.name;

  const hasChanged = form.definition ? !equals(customObject, values) : true;

  return (
    <Button disabled={!hasChanged || !withRequiredValues || form.formState.isSubmitting}>
      Save
    </Button>
  );
};
