export const CollectionsCacheKeys = {
  Collections: 'collections',
  Collection: (id: string) => `collection-${id}`,
  CollectionsExists: 'collections-exists'
};
