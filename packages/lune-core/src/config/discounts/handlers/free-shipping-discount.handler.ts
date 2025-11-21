import { FulfillmentDiscountHandler } from '../fulfillment-discount-handler';

export const FreeShippingDiscountHandler = new FulfillmentDiscountHandler({
  name: 'Free Shipping',
  description: 'Offer free shipping on an order',
  code: 'free-shipping',
  args: {
    orderRequirements: {
      type: 'custom',
      component: 'discount-order-requirements'
    }
  },
  async check(_, order, __, args) {
    const { orderRequirements } = args;

    if (orderRequirements.type === 'minimum_amount') {
      return order.subtotal >= orderRequirements.value;
    }

    if (orderRequirements.type === 'minimum_items') {
      return order.totalQuantity >= orderRequirements.value;
    }

    return true;
  },
  async apply(_, __, fulfillment, ___) {
    return fulfillment.amount;
  }
});
