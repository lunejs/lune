import { useState } from 'react';

import { CollectionContentType } from '@/lib/api/types';
import { useGetCollections } from '@/lib/collections/hooks/use-get-collections';

export const useCollectionTranslateList = () => {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('');

  const { isLoading, collections: allCollections } = useGetCollections();

  const collections = allCollections.filter(c => {
    const matchName = c.name.toLowerCase().includes(query.toLowerCase());

    if (filter === 'all') return matchName;

    if (filter === 'products') {
      return matchName && c.contentType === CollectionContentType.Products;
    }

    if (filter === 'collections') {
      return matchName && c.contentType === CollectionContentType.Collections;
    }

    return matchName;
  });

  return {
    setQuery,
    setFilter,
    collections,
    isLoading
  };
};
