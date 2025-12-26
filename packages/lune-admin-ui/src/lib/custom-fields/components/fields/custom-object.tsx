import { useEffect, useMemo, useState } from 'react';
import { EyeIcon, GroupIcon } from 'lucide-react';
import { Link } from 'react-router';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Label,
  Small
} from '@lune/ui';

import type {
  CommonCustomFieldDefinitionFragment,
  CommonCustomObjectDefinitionFragment,
  CommonCustomObjectEntryFragment
} from '@/lib/api/types';
import { useGetCustomObjectEntries } from '@/lib/custom-object-entry/hooks/use-get-custom-object-entries';
import { EntitySelector } from '@/shared/components/entity-selector/entity-selector';
import { DefaultEntitySelectorRow } from '@/shared/components/entity-selector/rows/default-entity-selector-row';

import { getDisplayFieldValue } from '../../utils/custom-field.utils';

import { CustomFieldEntityPreview } from './shared/preview/custom-field-entity-preview';
import { CustomFieldPreviewContainer } from './shared/preview/custom-field-preview-container';

export const CustomObjectReferenceCustomField = ({
  defaultValues,
  definition,
  onChange
}: Props) => {
  const objectDefinition = definition.referenceTarget as CommonCustomObjectDefinitionFragment;

  const [isOpen, setIsOpen] = useState(false);
  const { isLoading, customObjectEntries: allEntries } = useGetCustomObjectEntries(
    definition.referenceTarget?.id as string,
    {}
  );

  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<CommonCustomObjectEntryFragment[]>([]);

  const entries = useMemo(
    () =>
      allEntries.filter(e =>
        getDisplayFieldValue(e, objectDefinition).toLowerCase().includes(query.toLowerCase())
      ),
    [allEntries, query]
  );

  useEffect(() => {
    if (defaultValues) setSelected(allEntries.filter(p => defaultValues.includes(p.id)));
  }, [allEntries]);

  return (
    <div className="group grid grid-cols-1 items-center gap-2 md:grid-cols-[25%_1fr] md:gap-4">
      <Label className="w-full">{definition.name}</Label>

      <EntitySelector
        title="Add entries"
        description="Add entries"
        trigger={
          <CustomFieldPreviewContainer>
            {selected.map(entry => (
              <CustomFieldEntityPreview
                key={entry.id}
                title={getDisplayFieldValue(entry, objectDefinition)}
              />
            ))}
            {!!selected.length && (
              <button
                type="button"
                className="opacity-0 absolute right-0 w-8 flex justify-center items-center h-full bg-accent group-hover:opacity-100 transition-opacity before:absolute before:-left-4 before:top-0 before:h-full before:w-4 before:bg-linear-to-r before:from-transparent before:to-accent before:pointer-events-none"
                onClick={e => {
                  e.stopPropagation();
                  setIsOpen(true);
                }}
              >
                <EyeIcon size={16} />
              </button>
            )}
          </CustomFieldPreviewContainer>
        }
        items={entries}
        isLoading={isLoading}
        defaultSelected={selected}
        onSearch={setQuery}
        getRowId={item => item.id}
        onDone={selected => {
          // Remove this once add max prop
          const newSelected = definition.isList ? selected : selected[0] ? [selected[0]] : [];

          setSelected(newSelected);

          const ids = newSelected.map(s => s.id);

          if (definition.isList) onChange(ids.length ? ids : null);
          else onChange(newSelected[0]?.id ?? null);

          return true;
        }}
        renderItem={({ rowId, item, isSelected, onSelect }) => (
          <DefaultEntitySelectorRow
            key={rowId}
            title={getDisplayFieldValue(item, objectDefinition)}
            isSelected={isSelected}
            onSelect={onSelect}
          />
        )}
      />

      <Dialog isOpen={isOpen} setIsOpen={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{definition.name}</DialogTitle>
            <DialogDescription className="flex items-center gap-1">
              <GroupIcon size={16} />
              Custom object
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            {selected.map(entry => (
              <div key={entry.id} className="flex items-center gap-2">
                <div>
                  <Link to={`/custom-objects/${objectDefinition.id}/${entry.id}`}>
                    <Small className="hover:underline">
                      {getDisplayFieldValue(entry, objectDefinition)}
                    </Small>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

type Props = {
  defaultValues?: string[];
  onChange: (entriesIds: null | string | string[]) => void;
  definition: CommonCustomFieldDefinitionFragment;
};
