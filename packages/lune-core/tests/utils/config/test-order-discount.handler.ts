import { LunePrice } from '@lunejs/common';

import { OrderDiscountHandler } from '@/config/discounts/order-discount-handler';

export const TestOrderPriceDiscountHandler = new OrderDiscountHandler({
  name: '',
  description: '',
  code: 'order-discount',
  args: {
    applies: {
      type: 'boolean'
    },
    amountToDiscount: {
      type: 'price'
    }
  },
  async check(_, order, args) {
    const { applies } = args;

    return applies;
  },
  async apply(_, __, args) {
    return args.amountToDiscount ?? LunePrice.toCent(100);
  }
});
