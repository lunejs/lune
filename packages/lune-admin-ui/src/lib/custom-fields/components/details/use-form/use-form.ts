import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFormContext, type UseFormReturn } from 'react-hook-form';
import { useNavigate } from 'react-router';
import type z from 'zod';

import type { CustomFieldType } from '@/lib/api/types';
import {
  type CommonCustomFieldDefinitionFragment,
  type CustomFieldAppliesToEntity,
  CustomFieldDefinitionErrorCode
} from '@/lib/api/types';
import { useCreateCustomFieldDefinition } from '@/lib/custom-fields/hooks/use-create-custom-field-definition';
import { useUpdateCustomFieldDefinition } from '@/lib/custom-fields/hooks/use-update-custom-field-definition';
import { useLoadingNotification } from '@/shared/hooks/use-loading-notification';

import { CustomFieldDetailsSchema } from './form-schema';

export const useCustomFieldForm = (
  entity: CustomFieldAppliesToEntity,
  definition: CommonCustomFieldDefinitionFragment | undefined
) => {
  const navigate = useNavigate();

  const { loading, failure, success, dismiss } = useLoadingNotification();
  const { createCustomFieldDefinition } = useCreateCustomFieldDefinition();
  const { updateCustomFieldDefinition } = useUpdateCustomFieldDefinition();

  const form = useForm<FormValues>({
    resolver: zodResolver(CustomFieldDetailsSchema),
    defaultValues: {
      name: definition?.name ?? '',
      quantity: definition?.isList ? 'multiple' : 'single',
      type: definition?.type,
      referenceTargetId: definition?.referenceTarget?.id
    }
  });

  const onCreate = async (values: FormValues) => {
    loading('Saving...');

    const isList = values.quantity === 'multiple';

    const result = await createCustomFieldDefinition({
      isList,
      appliesToEntity: entity,
      name: values.name,
      order: 0,
      referenceTargetId: values.referenceTargetId,
      type: values.type as CustomFieldType
    });

    if (!result.isSuccess) {
      if (result.errorCode === CustomFieldDefinitionErrorCode.KeyAlreadyExists) {
        dismiss();
        form.setError('name', {
          message: 'Generated key is already used, try with another name'
        });

        return;
      }

      failure(result.error);
      return;
    }

    success(`${values.name} custom field created`);
    navigate(`/settings/custom-fields/${entity}/${result.data.id}`);
  };

  const onUpdate = async (definition: CommonCustomFieldDefinitionFragment, values: FormValues) => {
    loading('Saving...');

    const result = await updateCustomFieldDefinition(definition.id, {
      name: values.name,
      order: definition.order
    });

    if (!result.isSuccess) {
      failure(result.error);
      return;
    }

    success('Saved');
  };

  const onSubmit = async (values: FormValues) => {
    if (definition) {
      await onUpdate(definition, values);
    } else {
      await onCreate(values);
    }
  };

  return {
    ...form,
    definition,
    onSubmit: form.handleSubmit(onSubmit)
  };
};

export type FormValues = z.infer<typeof CustomFieldDetailsSchema>;

export const useCustomFieldFormContext = () => useFormContext<FormValues>() as Return;

type Return = UseFormReturn<FormValues> & { definition?: CommonCustomFieldDefinitionFragment };
