import { LunePrice } from '@lune/common';

import { OrderLineDiscountHandler } from '@/config/discounts/order-line-discount-handler';

export const TestOrderLineDiscountHandler = new OrderLineDiscountHandler({
  name: '',
  description: '',
  code: 'order-line-discount',
  args: {
    variants: {
      type: 'entity-selector',
      entity: 'variants'
    }
  },
  async check(_, __, line, args) {
    const { variants } = args;

    if (!variants.includes(line.variantId)) return false;

    return true;
  },
  async apply() {
    return LunePrice.toCent(300);
  }
});
