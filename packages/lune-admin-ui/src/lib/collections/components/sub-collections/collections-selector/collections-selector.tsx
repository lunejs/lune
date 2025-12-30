import { Button } from '@lunejs/ui';
import { CircleFadingPlusIcon } from 'lucide-react';

import type { CommonCollectionFragment } from '@/lib/api/types';
import { EntitySelector } from '@/shared/components/entity-selector/entity-selector';
import { DefaultEntitySelectorRow } from '@/shared/components/entity-selector/rows/default-entity-selector-row';

import { useCollectionsSelector } from './use-collection-selector';

export const CollectionsSelector = ({ disabled, defaultSelected, collection }: Props) => {
  const { selectCollections, isLoading, collections, setQuery } = useCollectionsSelector(
    collection.id
  );

  return (
    <EntitySelector
      title="Add Sub collections"
      description="Add sub collections to your collection"
      trigger={
        <Button variant={'outline'} type="button" disabled={disabled}>
          <CircleFadingPlusIcon /> Add sub collections
        </Button>
      }
      items={collections}
      isLoading={isLoading}
      defaultSelected={collections.filter(p => defaultSelected.includes(p.id))}
      onSearch={setQuery}
      getRowId={item => item.id}
      onDone={async selected => selectCollections(selected)}
      renderItem={({ rowId, item, isSelected, onSelect }) => (
        <DefaultEntitySelectorRow
          key={rowId}
          title={item.name}
          image={item.assets.items[0]?.source}
          isSelected={isSelected}
          onSelect={onSelect}
        />
      )}
    />
  );
};

type Props = {
  collection: CommonCollectionFragment;
  disabled: boolean;
  defaultSelected: string[];
};
