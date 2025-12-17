export const CustomerCacheKeys = {
  All: 'customers',
  Count: 'customers-count',
  Unique: (id: string) => `customer-${id}`
};
