import { useWatch } from 'react-hook-form';

import { Button } from '@lune/ui';

import { type CommonCollectionForTranslationFragment, Locale } from '@/lib/api/types';

import { useTranslateCollectionFormContext } from './use-form/use-translate-collection-form';

export const TranslateCollectionSubmitButton = ({ collection }: Props) => {
  const form = useTranslateCollectionFormContext();
  const values = useWatch({ defaultValue: form.getValues() });

  const translation = collection.translations.find(t => t.locale === Locale.En);

  const hasChanged =
    (translation?.name ?? '') !== values.name ||
    (translation?.description ?? '') !== values.description;

  return (
    <Button className="w-full sm:w-auto" disabled={!hasChanged || form.formState.isSubmitting}>
      Save
    </Button>
  );
};

type Props = {
  collection: CommonCollectionForTranslationFragment;
};
