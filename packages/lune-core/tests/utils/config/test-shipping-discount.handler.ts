import { LunePrice } from '@lune/common';

import { FulfillmentDiscountHandler } from '@/config/discounts/fulfillment-discount-handler';

export const TestFulfillmentDiscountHandler = new FulfillmentDiscountHandler({
  code: 'fulfillment-discount',
  args: {
    applies: {
      type: 'boolean'
    }
  },
  async check(_, __, ___, args) {
    const { applies } = args;

    return applies;
  },
  async apply() {
    return LunePrice.toCent(50);
  }
});
