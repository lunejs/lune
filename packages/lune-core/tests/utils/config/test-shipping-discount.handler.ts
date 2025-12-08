import { LunePrice } from '@lune/common';

import { FulfillmentDiscountHandler } from '@/config/discounts/fulfillment-discount-handler';

export const TestFulfillmentDiscountHandler = new FulfillmentDiscountHandler({
  name: '',
  description: '',
  code: 'fulfillment-discount',
  args: {
    applies: {
      type: 'boolean'
    },
    amountToDiscount: {
      type: 'price'
    }
  },
  async check(_, __, ___, args) {
    const { applies } = args;

    return applies;
  },
  async apply(_, __, ___, args) {
    return args.amountToDiscount ?? LunePrice.toCent(50);
  }
});
