import { Checkbox, Small } from '@lune/ui';

import { byAlreadyFullyFulfilled, getRemainingQuantity } from '@/lib/order/utils/fulfillment.utils';

import { useAddFulfillmentFormContext } from '../../use-form';

export const FulfillmentLineSelectorHeader = () => {
  const { order, ...form } = useAddFulfillmentFormContext();

  const selected = form.watch('orderLines');
  const fulfillmentLines = order.fulfillments.items.flatMap(f => f.lines.items.map(l => l));

  const allLinesAvailable = order.lines.items
    .filter(byAlreadyFullyFulfilled(fulfillmentLines))
    .map(line => ({ id: line.id, quantity: getRemainingQuantity(fulfillmentLines, line) }));

  return (
    <label className="flex items-center gap-2 py-4 px-6 border-b">
      <Checkbox
        checked={selected.length === allLinesAvailable.length}
        onCheckedChange={value => {
          if (!value) {
            form.setValue('orderLines', []);
            return;
          }

          form.setValue('orderLines', allLinesAvailable);
        }}
      />
      <Small>Select all</Small>
    </label>
  );
};
