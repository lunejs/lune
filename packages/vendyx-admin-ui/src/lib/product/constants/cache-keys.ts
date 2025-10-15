export const ProductCacheKeys = {
  Products: 'products',
  Product: (id: string) => `product-${id}`,
  ProductsCount: 'products-count'
};
