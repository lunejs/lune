import { Button } from '@lunejs/ui';
import { useWatch } from 'react-hook-form';

import { useCustomFieldFormContext } from './use-form';

export const CustomFieldSubmitButton = () => {
  const form = useCustomFieldFormContext();

  const values = useWatch({ defaultValue: form.getValues() });

  const valuesHasChanged = values.name !== form.definition?.name;
  const withRequiredValues = !!values.name;

  return <Button disabled={!valuesHasChanged || !withRequiredValues}>Save</Button>;
};
