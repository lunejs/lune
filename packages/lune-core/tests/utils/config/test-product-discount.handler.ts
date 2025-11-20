import { OrderLineDiscountHandler } from '@/config/discounts/order-line-discount-handler';

export const ProductDiscountHandler = new OrderLineDiscountHandler({
  code: 'product-discount',
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
    return 100;
  }
});
