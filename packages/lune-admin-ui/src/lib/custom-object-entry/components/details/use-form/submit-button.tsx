import { useWatch } from 'react-hook-form';

import { equals } from '@lune/common';
import { Button } from '@lune/ui';

import { useCustomObjectEntryFormContext } from './use-form';

export const CustomObjectEntrySubmitButton = () => {
  const { entry, ...form } = useCustomObjectEntryFormContext();
  const values = useWatch({ defaultValue: form.getValues() });

  const formValues = values.customFields ?? {};
  const persisted =
    entry?.values.reduce((prev, curr) => ({ ...prev, [curr.field.id]: curr.value }), {}) ?? {};

  const hasChanged = !equals(formValues, persisted);

  return (
    <Button type="submit" disabled={!hasChanged || form.formState.isSubmitting}>
      Save
    </Button>
  );
};
