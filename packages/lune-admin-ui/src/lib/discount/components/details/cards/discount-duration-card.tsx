import { formatDate, subDays } from 'date-fns';

import { Card, CardContent, CardHeader, CardTitle, FormDatePicker } from '@lune/ui';

import { useDiscountDetailsFormContext } from '../use-form/use-form';

import { DiscountEndsAt } from './discount-ends-at/discount-ends-at';

export const DiscountDurationCard = () => {
  const { control } = useDiscountDetailsFormContext();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Duration</CardTitle>
      </CardHeader>

      <CardContent className="flex items-start gap-4">
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
