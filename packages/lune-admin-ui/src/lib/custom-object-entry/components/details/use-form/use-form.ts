import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFormContext, type UseFormReturn } from 'react-hook-form';
import { useNavigate } from 'react-router';
import type z from 'zod';

import type {
  CommonCustomObjectDefinitionFragment,
  CommonCustomObjectEntryFragment
} from '@/lib/api/types';
import { useCreateCustomObjectEntry } from '@/lib/custom-object-entry/hooks/use-create-custom-object-entry';
import { useLoadingNotification } from '@/shared/hooks/use-loading-notification';

import { CustomObjectEntrySchema as schema } from './form-schema';

export const useCustomObjectEntryForm = (
  definition: CommonCustomObjectDefinitionFragment,
  entry: CommonCustomObjectEntryFragment | null
) => {
  const navigate = useNavigate();
  const { loading, failure, success } = useLoadingNotification();
  const { createCustomObjectEntry } = useCreateCustomObjectEntry();

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      customFields: {}
    }
  });

  const onSubmit = async (values: FormValues) => {
    if (entry) {
      console.log(values);
      return;
    }

    loading('Saving...');

    const result = await createCustomObjectEntry(definition.id, {
      values: Object.entries(values.customFields).map(([key, value]) => ({ id: key, value }))
    });

    if (!result.isSuccess) {
      failure(result.error);
      return;
    }

    success('Custom object entry saved');
    navigate(`/custom-objects/${definition.id}/${result.data.id}`);
  };

  return {
    ...form,
    onSubmit: form.handleSubmit(onSubmit)
  };
};

type FormValues = z.infer<typeof schema>;

export const useProductDetailsFormContext = (): HookReturn => {
  return useFormContext<FormValues>() as HookReturn;
};

type HookReturn = UseFormReturn<FormValues> & {
  definition?: CommonCustomObjectDefinitionFragment;
};
