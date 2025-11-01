import { useParams } from 'react-router';

import { TranslateListItem } from '../../list/item/translate-list-item';
import { TranslateList } from '../../list/translate-list';

import { useCollectionTranslateList } from './use-collection-translate-list';

export const CollectionTranslateList = ({ className }: Props) => {
  const { id } = useParams() as { id: string };

  const { isLoading, collections, setFilter, setQuery } = useCollectionTranslateList();

  return (
    <TranslateList
      className={className}
      filters={[
        { label: 'All', value: 'all', combinable: false, defaultChecked: true },
        { label: 'Products', value: 'products', combinable: false },
        { label: 'Collections', value: 'collections', combinable: false }
      ]}
      isLoading={isLoading}
      items={collections}
      onSearch={setQuery}
      onFilterChange={activeFilters => setFilter(activeFilters[0])}
      renderItem={collection => {
        const isSelected = collection.id === id;

        return (
          <TranslateListItem
            key={collection.id}
            href={`/translate/collections/${collection.id}`}
            isSelected={isSelected}
            title={collection.name}
            image={collection.assets.items[0]?.source}
          />
        );
      }}
    />
  );
};

type Props = {
  className?: {
    root?: string;
    list?: string;
  };
};
