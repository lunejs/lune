import { LunePrice } from '@lunejs/common';

import { OrderLineDiscountHandler } from '@/config/discounts/order-line-discount-handler';

export const TestOrderLineDiscountHandler = new OrderLineDiscountHandler({
  name: '',
  description: '',
  code: 'order-line-discount',
  args: {
    variants: {
      type: 'entity-selector',
      entity: 'variants'
    },
    amountToDiscount: {
      type: 'price'
    }
  },
  async check(_, __, line, args) {
    const { variants } = args;

    if (!variants.includes(line.variantId)) return false;

    return true;
  },
  async apply(_, __, ___, args) {
    return args.amountToDiscount ?? LunePrice.toCent(300);
  }
});
