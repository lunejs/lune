export const OrderCacheKeys = {
  All: 'orders',
  Count: 'orders-count',
  Unique: (id: string) => `order-${id}`
};
