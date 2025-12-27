import { Checkbox, Small } from '@lune/ui';

import { useAddFulfillmentFormContext } from '../../use-form';

export const FulfillmentLineSelectorHeader = () => {
  const { order, ...form } = useAddFulfillmentFormContext();

  return (
    <label className="flex items-center gap-2 py-4 px-6 border-b">
      <Checkbox
        onCheckedChange={value =>
          value
            ? form.setValue(
                'orderLines',
                order.lines.items.map(l => ({ id: l.id, quantity: l.quantity }))
              )
            : form.setValue('orderLines', [])
        }
      />
      <Small>Select all</Small>
    </label>
  );
};
