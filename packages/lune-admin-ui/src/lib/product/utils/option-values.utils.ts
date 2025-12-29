import { type CommonCustomObjectEntryFragment, CustomFieldType } from '@/lib/api/types';

export const getEntryColorValue = (entry: CommonCustomObjectEntryFragment) => {
  const colorField = entry.values.find(v => v.field.type === CustomFieldType.Color);
  return colorField?.value;
};

export const getEntryDisplayValue = (
  entry: CommonCustomObjectEntryFragment,
  displayFieldId: string | undefined
) => {
  if (!displayFieldId) return entry.values[0]?.value as string;
  const displayValue = entry.values.find(v => v.field.id === displayFieldId);
  return (displayValue?.value as string) ?? '';
};
