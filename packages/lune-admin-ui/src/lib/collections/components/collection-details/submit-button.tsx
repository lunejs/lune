import { equals } from '@lunejs/common';
import { Button } from '@lunejs/ui';
import { type DeepPartial, useWatch } from 'react-hook-form';

import type { CommonCollectionFragment } from '@/lib/api/types';

import {
  type CollectionDetailsFormValues,
  useCollectionDetailsFormContext
} from './use-form/use-form';

export const CollectionDetailsSubmitButton = () => {
  const { collection, ...form } = useCollectionDetailsFormContext();
  const values = useWatch({ defaultValue: form.getValues() });

  const withRequiredFields = !!values.name;

  const generalInfoHasChanged = getGeneralInfoHasChanged(values, collection);
  const customFieldsHasChanged = getCustomFieldsHasChanged(values, collection);

  return (
    <Button
      disabled={
        !(generalInfoHasChanged || customFieldsHasChanged) ||
        form.formState.isSubmitting ||
        !withRequiredFields
      }
    >
      Save
    </Button>
  );
};

const getGeneralInfoHasChanged = (
  values: DeepPartial<CollectionDetailsFormValues>,
  collection: CommonCollectionFragment | null
) => {
  const persisted = {
    name: collection?.name,
    enabled: collection?.enabled,
    description: collection?.description,
    contentType: collection?.contentType
  };

  const form = {
    name: values?.name,
    enabled: values?.enabled,
    description: values?.description,
    contentType: values.contentType
  };

  return !equals(persisted, form);
};

const getCustomFieldsHasChanged = (
  values: DeepPartial<CollectionDetailsFormValues>,
  collection: CommonCollectionFragment | null
) => {
  const formCustomFields = values.customFields ?? {};
  const productCustomFields =
    collection?.customFieldEntries.reduce(
      (prev, curr) => ({ ...prev, [curr.definition.id]: curr.value }),
      {}
    ) ?? {};

  console.log({ formCustomFields, productCustomFields });

  return !equals(formCustomFields, productCustomFields);
};
