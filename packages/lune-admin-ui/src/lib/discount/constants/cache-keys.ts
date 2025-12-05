export const DiscountCacheKeys = {
  count: 'count',
  all: 'discounts',
  unique: (id: string) => `discount-${id}`,
  withFilters: (filters: any) => JSON.stringify(filters),
  handlers: 'discount-handlers'
};
