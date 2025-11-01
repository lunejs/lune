import { useMemo, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { notification } from '@lune/ui';

import type { CommonCollectionFragment } from '@/lib/api/types';
import { ItemsTable } from '@/shared/components/items-table/items-table';
import { TYPING_DEBOUNCE_DELAY } from '@/shared/utils/constants.utils';

import { useGetCollectionSubCollections } from '../../hooks/use-get-collection-sub-collection';
import { useUpdateCollection } from '../../hooks/use-update-collection';

import { CollectionsSelector } from './collections-selector/collections-selector';

export const CollectionSubCollectionsCard = ({ collection }: Props) => {
  const [query, setQuery] = useState('');

  const { updateCollection } = useUpdateCollection();
  const { isLoading, subCollections: allSubCollections } = useGetCollectionSubCollections(
    collection.id
  );

  const onQueryChange = useDebouncedCallback(setQuery, TYPING_DEBOUNCE_DELAY);

  const subCollections = useMemo(
    () => allSubCollections.filter(p => p.name.toLowerCase().includes(query.toLowerCase())),
    [allSubCollections]
  );

  return (
    <ItemsTable>
      <ItemsTable.Header>
        <ItemsTable.HeaderTitle>Products</ItemsTable.HeaderTitle>

        <ItemsTable.HeaderAction>
          <CollectionsSelector
            collection={collection}
            defaultSelected={allSubCollections.map(p => p.id)}
            disabled={isLoading}
          />
        </ItemsTable.HeaderAction>
      </ItemsTable.Header>
      <ItemsTable.Content isLoading={isLoading}>
        <ItemsTable.Search
          placeholder="Search sub collections..."
          onChange={e => onQueryChange(e.target.value)}
        />

        <ItemsTable.List>
          {!subCollections?.length && <ItemsTable.ListEmpty />}

          {subCollections?.map(subCollection => (
            <ItemsTable.ListItem
              key={subCollection.id}
              title={subCollection.name}
              image={subCollection.assets.items[0]?.source}
              enabled={subCollection.enabled}
              href={`/collections/${subCollection.id}`}
              onRemove={async () => {
                const result = await updateCollection(collection.id, {
                  subCollections: [
                    ...allSubCollections.map(p => p.id).filter(id => id !== subCollection.id)
                  ]
                });

                if (!result.isSuccess) {
                  notification.error(result.error);
                  return;
                }

                notification.success('Sub collection removed');
              }}
            />
          ))}
        </ItemsTable.List>
      </ItemsTable.Content>
    </ItemsTable>
  );
};

type Props = {
  collection: CommonCollectionFragment;
};
