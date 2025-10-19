export const ProductCacheKeys = {
  Products: 'products',
  Product: (id: string) => `product-${id}`,
  ProductForTranslation: (id: string) => `product-for-translation-${id}`,
  ProductsCount: 'products-count'
};
