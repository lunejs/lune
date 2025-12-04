import { addMonths, formatDate } from 'date-fns';

import { FormDatePicker } from '@lune/ui';

import { useDiscountDetailsFormContext } from '../../use-form/use-form';

export const DiscountEndsAt = () => {
  const { control, watch } = useDiscountDetailsFormContext();

  const startsAt = watch('startsAt');

  return (
    <FormDatePicker
      control={control}
      name="endsAt"
      label="Ends at"
      placeholder={formatDate(addMonths(new Date(), 1), 'PPP')}
      disabledDates={date => date < startsAt}
    />
  );
};
