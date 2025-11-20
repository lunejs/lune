import { FulfillmentDiscountHandler } from '@/config/discounts/fulfillment-discount-handler';

export const FreeShippingDiscountHandler = new FulfillmentDiscountHandler({
  code: 'shipping-discount',
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
    return 100;
  }
});
