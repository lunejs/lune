import { useWatch } from 'react-hook-form';

import { equals } from '@lune/common';
import { Button } from '@lune/ui';

import { type CommonCustomObjectEntryForTranslationFragment, Locale } from '@/lib/api/types';
import { isTranslatable } from '@/lib/custom-fields/utils/custom-field.utils';

import { useTranslateCustomObjectEntryFormContext } from './use-form/use-translate-object-entry-form';

export const TranslateCustomObjectEntrySubmitButton = ({ entry }: Props) => {
  const form = useTranslateCustomObjectEntryFormContext();
  const values = useWatch({ defaultValue: form.getValues() });

  const formValues = Object.entries(values.customFields ?? {});
  const persisted = entry.values
    .filter(cf => isTranslatable(cf.field.type))
    .map(field => {
      const fieldTranslation = field.translations.find(t => t.locale === Locale.En);
      return [field.id, fieldTranslation?.value];
    });

  const isDirty = !equals(formValues, persisted);

  return (
    <Button className="w-full sm:w-auto" disabled={!isDirty || form.formState.isSubmitting}>
      Save
    </Button>
  );
};

type Props = {
  entry: CommonCustomObjectEntryForTranslationFragment;
};
