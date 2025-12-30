import { LunePrice } from '@lunejs/common';

import { DeliveryMethodDiscountHandler } from '@/config/discounts/fulfillment-discount-handler';

export const TestFulfillmentDiscountHandler = new DeliveryMethodDiscountHandler({
  name: '',
  description: '',
  code: 'fulfillment-discount',
  args: {
    applies: {
      type: 'boolean'
    },
    amountToDiscount: {
      type: 'price'
    },
    appliesToOrderId: {
      type: 'text'
    }
  },
  async check(_, order, ___, args) {
    const { applies, appliesToOrderId } = args;

    if (appliesToOrderId && order.id !== appliesToOrderId) {
      return false;
    }

    return applies;
  },
  async apply(_, __, ___, args) {
    return args.amountToDiscount ?? LunePrice.toCent(50);
  }
});
