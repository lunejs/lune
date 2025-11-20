import { OrderDiscountHandler } from '@/config/discounts/order-discount-handler';

export const OrderPriceDiscountHandler = new OrderDiscountHandler({
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
    return 100;
  }
});
