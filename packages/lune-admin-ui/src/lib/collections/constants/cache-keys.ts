export const CollectionsCacheKeys = {
  All: 'collections',
  Count: 'collections-exists',
  Unique: (id: string) => `collection-${id}`,
  UniqueForTranslation: (id: string) => `collection-translation-${id}`,
  Products: (id: string) => `collection-${id}-products`,
  SubCollections: (id: string) => `collection-${id}-sub-collections`
};
