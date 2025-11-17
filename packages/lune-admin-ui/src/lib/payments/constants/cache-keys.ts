export const PaymentCacheKeys = {
  PaymentMethods: 'payment-methods',
  PaymentHandlers: 'payment-handlers',
  PaymentMethod: (id: string) => `payment-method-${id}`
};
