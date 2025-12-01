export const DiscountCacheKeys = {
  all: 'discounts',
  withFilters: (filters: any) => JSON.stringify(filters),
  handlers: 'discount-handlers'
};
