export const ProductCacheKeys = {
  All: 'products',
  Count: 'products-count',
  Unique: (id: string) => `product-${id}`,
  UniqueForTranslation: (id: string) => `product-for-translation-${id}`,
  UniqueForVariants: (id: string) => `product-for-variants-${id}`
};
