import { OrderLineDiscountHandler } from '../order-line-discount-handler';

export const ProductDiscountHandler = new OrderLineDiscountHandler({
  name: 'Product Discount',
  description: 'Apply a discount to specific products on an order',
  code: 'product-discount',
  args: {
    discountValue: {
      type: 'custom',
      component: 'discount-value'
    },
    orderRequirements: {
      type: 'custom',
      component: 'discount-order-requirements'
    },
    variants: {
      type: 'entity-selector',
      entity: 'variants'
    }
  },
  async check(_, order, line, args) {
    const { variants, orderRequirements } = args;

    if (!variants.includes(line.variantId)) return false;

    if (orderRequirements.type === 'minimum_amount') {
      return order.subtotal >= orderRequirements.value;
    }

    if (orderRequirements.type === 'minimum_items') {
      return order.totalQuantity >= orderRequirements.value;
    }

    return true;
  },
  async apply(_, __, line, args) {
    const { discountValue } = args;

    const isPercentage = discountValue.type === 'percentage';
    const discountedAmount = isPercentage
      ? line.lineSubtotal * discountValue.value
      : discountValue.value;

    return discountedAmount;
  }
});
