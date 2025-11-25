export const ProductCacheKeys = {
  Products: 'products',
  Product: (id: string) => `product-${id}`,
  ProductForTranslation: (id: string) => `product-for-translation-${id}`,
  ForVariants: (id: string) => `product-for-variants-${id}`,
  ProductsCount: 'products-count'
};
