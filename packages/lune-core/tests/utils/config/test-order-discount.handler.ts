import { LunePrice } from '@lune/common';

import { OrderDiscountHandler } from '@/config/discounts/order-discount-handler';

export const TestOrderPriceDiscountHandler = new OrderDiscountHandler({
  name: '',
  description: '',
  code: 'order-discount',
  args: {
    applies: {
      type: 'boolean'
    }
  },
  async check(_, order, args) {
    const { applies } = args;

    return applies;
  },
  async apply(_, __, ___) {
    return LunePrice.toCent(100);
  }
});
