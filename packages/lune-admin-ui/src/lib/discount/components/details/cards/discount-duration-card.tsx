import { Card, CardContent, CardHeader, CardTitle, FormDatePicker } from '@lunejs/ui';
import { formatDate, subDays } from 'date-fns';

import { useDiscountDetailsFormContext } from '../use-form/use-form';

import { DiscountEndsAt } from './discount-ends-at/discount-ends-at';

export const DiscountDurationCard = () => {
  const { control } = useDiscountDetailsFormContext();

  return (
    <Card>
      <CardHeader className="flex">
        <CardTitle>Duration</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col items-start gap-4 sm:flex-row">
        <FormDatePicker
          control={control}
          name="startsAt"
          label="Starts at"
          placeholder={formatDate(new Date(), 'PPP')}
          disabledDates={date => date < subDays(new Date(), 1)}
        />
        <DiscountEndsAt />
      </CardContent>
    </Card>
  );
};
