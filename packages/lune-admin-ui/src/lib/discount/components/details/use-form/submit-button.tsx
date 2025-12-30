import { useWatch } from 'react-hook-form';

import { equals } from '@lunejs/common';
import { Button } from '@lunejs/ui';

import { useDiscountDetailsFormContext } from './use-form';

export const DiscountDetailsSubmitButton = () => {
  const form = useDiscountDetailsFormContext();
  const formValues = useWatch({ defaultValue: form.getValues() });

  const discount = {
    code: form.discount?.code,
    enabled: form.discount?.enabled,
    startsAt: form.discount?.startsAt,
    endsAt: form.discount?.endsAt || null,
    perCustomerLimit: form.discount?.perCustomerLimit || null,
    args: form.discount?.handler.args
  };

  const values = {
    code: formValues.code,
    enabled: formValues.enabled,
    startsAt: formValues.startsAt?.toISOString(),
    endsAt: formValues.endsAt || null,
    perCustomerLimit: formValues.perCustomerLimit || null,
    args: formValues.metadata
  };

  const hasChanged = discount ? !equals(discount, values) : true;

  return <Button disabled={!hasChanged || form.formState.isSubmitting}>Save</Button>;
};
