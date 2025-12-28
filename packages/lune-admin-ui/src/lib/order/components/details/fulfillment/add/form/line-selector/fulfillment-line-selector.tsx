import { byAlreadyFullyFulfilled, getRemainingQuantity } from '@/lib/order/utils/fulfillment.utils';

import { useAddFulfillmentFormContext } from '../use-form';

import { FulfillmentLineSelectorHeader } from './header/fulfillment-line-selector-header';
import { FulfillmentLineSelectorItem } from './item/fulfillment-line-selector-item';

export const FulfillmentLineSelector = () => {
  const { order, ...form } = useAddFulfillmentFormContext();

  const selected = form.watch('orderLines');

  const fulfillmentLines = order.fulfillments.items.flatMap(f => f.lines.items.map(l => l));

  return (
    <div className="flex flex-col border-y">
      <FulfillmentLineSelectorHeader />
      <div className="flex flex-col divide-y">
        {order.lines.items.filter(byAlreadyFullyFulfilled(fulfillmentLines)).map(line => {
          const isSelected = selected.some(ol => ol.id === line.id);
          const remainingQuantity = getRemainingQuantity(fulfillmentLines, line);

          return (
            <FulfillmentLineSelectorItem
              key={line.id}
              line={line}
              isSelected={isSelected}
              remainingQuantity={remainingQuantity}
            />
          );
        })}
      </div>
    </div>
  );
};
