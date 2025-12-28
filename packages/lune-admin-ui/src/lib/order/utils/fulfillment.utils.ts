import type { CommonOrderFragment } from '@/lib/api/types';

export const byAlreadyFullyFulfilled =
  (fulfillmentLines: CommonOrderFragment['fulfillments']['items'][0]['lines']['items']) =>
  (orderLine: CommonOrderFragment['lines']['items'][0]) => {
    const fulfillmentLineWithOrderLine = fulfillmentLines.filter(
      fl => fl.orderLine.id === orderLine.id
    );
    const totalQuantity = fulfillmentLineWithOrderLine.reduce(
      (prev, curr) => prev + curr.quantity,
      0
    );

    return !(totalQuantity === orderLine.quantity);
  };

export const getRemainingQuantity = (
  fulfillmentLines: CommonOrderFragment['fulfillments']['items'][0]['lines']['items'],
  orderLine: CommonOrderFragment['lines']['items'][0]
) => {
  const fulfillmentLineWithOrderLine = fulfillmentLines.filter(
    fl => fl.orderLine.id === orderLine.id
  );
  const totalQuantity = fulfillmentLineWithOrderLine.reduce(
    (prev, curr) => prev + curr.quantity,
    0
  );
  const remainingQuantity = orderLine.quantity - totalQuantity;

  return remainingQuantity;
};
