import { useMemo, useState } from 'react';
import { useParams } from 'react-router';

import type { CommonCustomObjectDefinitionFragment } from '@/lib/api/types';
import { getDisplayFieldValue } from '@/lib/custom-fields/utils/custom-field.utils';
import { useGetCustomObjectEntries } from '@/lib/custom-object-entry/hooks/use-get-custom-object-entries';

import { TranslateListItem } from '../../list/item/translate-list-item';
import { TranslateList } from '../../list/translate-list';

export const CustomObjectTranslateList = ({ definition, className }: Props) => {
  const { entryId } = useParams() as { entryId: string };
  const [query, setQuery] = useState('');

  const { isLoading, customObjectEntries: allEntries } = useGetCustomObjectEntries(
    definition.id,
    {}
  );

  const entries = useMemo(
    () =>
      allEntries.filter(e =>
        getDisplayFieldValue(e, definition).toLowerCase().includes(query.toLowerCase())
      ),
    [allEntries, query]
  );

  return (
    <TranslateList
      className={className}
      filters={[]}
      isLoading={isLoading}
      items={entries}
      onSearch={setQuery}
      onFilterChange={() => void 0}
      renderItem={entry => {
        const isSelected = entry.id === entryId;

        return (
          <TranslateListItem
            key={entry.id}
            href={`/translate/custom-objects/${definition.id}/${entry.id}`}
            isSelected={isSelected}
            title={getDisplayFieldValue(entry, definition)}
          />
        );
      }}
    />
  );
};

type Props = {
  definition: CommonCustomObjectDefinitionFragment;
  className?: {
    root?: string;
    list?: string;
  };
};
