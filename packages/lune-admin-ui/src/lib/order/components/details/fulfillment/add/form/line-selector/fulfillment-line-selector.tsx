import { useAddFulfillmentFormContext } from '../use-form';

import { FulfillmentLineSelectorHeader } from './header/fulfillment-line-selector-header';
import { FulfillmentLineSelectorItem } from './item/fulfillment-line-selector-item';

export const FulfillmentLineSelector = () => {
  const { order, ...form } = useAddFulfillmentFormContext();

  const selected = form.watch('orderLines');

  return (
    <div className="flex flex-col border-y">
      <FulfillmentLineSelectorHeader />
      <div className="flex flex-col divide-y">
        {order.lines.items.map(line => {
          const isSelected = selected.some(ol => ol.id === line.id);

          return <FulfillmentLineSelectorItem key={line.id} line={line} isSelected={isSelected} />;
        })}
      </div>
    </div>
  );
};
