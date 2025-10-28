import { useWatch } from 'react-hook-form';

import { Button } from '@vendyx/ui';

import { useCollectionDetailsFormContext } from './use-form/use-form';

export const CollectionDetailsSubmitButton = () => {
  const form = useCollectionDetailsFormContext();
  const values = useWatch({ defaultValue: form.getValues() });

  const withRequiredFields = !!values.name;

  return <Button disabled={!form.formState.isDirty || !withRequiredFields}>Save</Button>;
};
