export const CollectionsCacheKeys = {
  Collections: 'collections',
  Collection: (id: string) => `collection-${id}`,
  CollectionForTranslation: (id: string) => `collection-translation-${id}`,
  CollectionsExists: 'collections-exists',
  Products: (id: string) => `collection-${id}-products`
};
