import { Button } from '@lunejs/ui';
import { useWatch } from 'react-hook-form';

import { useZoneFormDetailsContext } from './use-form';

export const ZoneDetailsSubmitButton = () => {
  const form = useZoneFormDetailsContext();
  const values = useWatch({ defaultValue: form.getValues() });

  const withRequiredValues = Boolean(values.name?.length);

  return (
    <Button
      type="submit"
      disabled={!withRequiredValues || form.formState.isSubmitting || !form.formState.isDirty}
    >
      Save
    </Button>
  );
};
