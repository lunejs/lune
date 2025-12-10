export const DiscountCacheKeys = {
  count: 'discounts-count',
  all: 'discounts',
  unique: (id: string) => `discount-${id}`,
  withFilters: (filters: any) => JSON.stringify(filters),
  handlers: 'discount-handlers'
};
