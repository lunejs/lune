import { useWatch } from 'react-hook-form';

import { equals } from '@lune/common';
import { Button } from '@lune/ui';

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

  const hasChanged = form.definition ? !equals(customObject, values) : true;

  return <Button disabled={!hasChanged || form.formState.isSubmitting}>Save</Button>;
};
