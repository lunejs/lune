import { useMemo, useState } from 'react';
import { notification } from '@lunejs/ui';

import { CollectionContentType, type CommonListCollectionFragment } from '@/lib/api/types';
import { useGetCollections } from '@/lib/collections/hooks/use-get-collections';
import { useUpdateCollection } from '@/lib/collections/hooks/use-update-collection';

export const useCollectionsSelector = (collectionId: string) => {
  const [query, setQuery] = useState('');

  const { updateCollection } = useUpdateCollection();
  const { isLoading, collections: allCollections } = useGetCollections({
    filters: { contentType: CollectionContentType.Products }
  });

  const collections = useMemo(
    () =>
      allCollections.filter(c => {
        const nameMatching = c.name.toLowerCase().includes(query.toLowerCase());
        const isParent = c.id == collectionId;

        return nameMatching && !isParent;
      }),
    [allCollections]
  );

  const selectCollections = async (selected: CommonListCollectionFragment[]) => {
    const result = await updateCollection(collectionId, {
      subCollections: selected.map(s => s.id)
    });

    if (!result.isSuccess) {
      notification.error(result.error);
    } else {
      notification.success('Sub collections added');
    }

    return result.isSuccess;
  };

  return {
    collections,
    isLoading,
    setQuery,
    selectCollections
  };
};
