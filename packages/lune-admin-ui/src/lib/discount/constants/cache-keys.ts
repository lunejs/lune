export const DiscountCacheKeys = {
  All: 'discounts',
  Count: 'discounts-count',
  Unique: (id: string) => `discount-${id}`,
  Handlers: 'discount-handlers'
};
