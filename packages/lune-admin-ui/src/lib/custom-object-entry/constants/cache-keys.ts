export const CustomObjectEntryCacheKeys = {
  All: 'custom-object-entries',
  Unique: (id: string) => `custom-object-entry-${id}`,
  UniqueForTranslation: (id: string) => `custom-object-entry-translation-${id}`,
  Count: (definitionId: string) => `custom-object-entries-count-${definitionId}`
};
