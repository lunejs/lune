export const PaymentCacheKeys = {
  All: 'payment-methods',
  Handlers: 'payment-handlers',
  Unique: (id: string) => `payment-method-${id}`
};
