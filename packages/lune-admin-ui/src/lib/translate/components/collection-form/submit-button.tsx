import { type DeepPartial, useWatch } from 'react-hook-form';

import { equals } from '@lunejs/common';
import { Button } from '@lunejs/ui';

import { type CommonCollectionForTranslationFragment, Locale } from '@/lib/api/types';
import { isTranslatable } from '@/lib/custom-fields/utils/custom-field.utils';

import {
  type TranslateCollectionFormValues,
  useTranslateCollectionFormContext
} from './use-form/use-translate-collection-form';

export const TranslateCollectionSubmitButton = ({ collection }: Props) => {
  const form = useTranslateCollectionFormContext();
  const values = useWatch({ defaultValue: form.getValues() });

  const translation = collection.translations.find(t => t.locale === Locale.En);

  const customFieldsHasChanged = getCustomFieldsHasChanged(collection, values);
  const hasChanged =
    (translation?.name ?? '') !== values.name ||
    (translation?.description ?? '') !== values.description;

  const isDirty = customFieldsHasChanged || hasChanged || form.formState.isSubmitting;

  return (
    <Button className="w-full sm:w-auto" disabled={!isDirty}>
      Save
    </Button>
  );
};

type Props = {
  collection: CommonCollectionForTranslationFragment;
};

const getCustomFieldsHasChanged = (
  product: CommonCollectionForTranslationFragment,
  values: DeepPartial<TranslateCollectionFormValues>
) => {
  const form = Object.entries(values.customFields ?? {});
  const persisted = product.customFieldEntries
    .filter(cf => isTranslatable(cf.definition.type))
    .map(field => {
      const fieldTranslation = field.translations.find(t => t.locale === Locale.En);
      return [field.id, fieldTranslation?.value];
    });

  return !equals(form, persisted);
};
