import { OrderDiscountHandler } from '../order-discount-handler';

export const OrderPriceDiscountHandler = new OrderDiscountHandler({
  name: 'Order Discount',
  description: 'Apply a discount to the entire order',
  code: 'order-discount',
  args: {
    discountValue: {
      type: 'custom',
      component: 'discount-value'
    },
    orderRequirements: {
      type: 'custom',
      component: 'discount-order-requirements'
    }
  },
  async check(_, order, args) {
    const { orderRequirements } = args;

    if (orderRequirements.type === 'minimum_amount') {
      return order.subtotal >= orderRequirements.value;
    }

    if (orderRequirements.type === 'minimum_items') {
      return order.totalQuantity >= orderRequirements.value;
    }

    return true;
  },
  async apply(_, order, args) {
    const { discountValue } = args;

    const isPercentage = discountValue.type === 'percentage';
    const discountedAmount = isPercentage
      ? order.subtotal * discountValue.value
      : discountValue.value;

    return discountedAmount;
  }
});
