import { useWatch } from 'react-hook-form';

import { Button } from '@lunejs/ui';

import { useLocationDetailsFormContext } from './use-form';

export const LocationSubmitButton = () => {
  const form = useLocationDetailsFormContext();
  const values = useWatch({ defaultValue: form.getValues() });

  const withRequiredFields =
    Boolean(values.name?.length) &&
    Boolean(values.city?.length) &&
    Boolean(values.phoneNumber?.length) &&
    Boolean(values.postalCode?.length) &&
    Boolean(values.streetLine1?.length);

  return (
    <Button
      type="submit"
      disabled={!form.formState.isDirty || !withRequiredFields || form.formState.isSubmitting}
    >
      Save
    </Button>
  );
};
