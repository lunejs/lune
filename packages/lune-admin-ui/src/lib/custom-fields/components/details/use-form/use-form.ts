import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router';
import type z from 'zod';

import {
  type CustomFieldAppliesToEntity,
  CustomFieldDefinitionErrorCode,
  type CustomFieldType
} from '@/lib/api/types';
import { useCreateCustomFieldDefinition } from '@/lib/custom-fields/hooks/use-create-custom-field-definition';
import { useLoadingNotification } from '@/shared/hooks/use-loading-notification';

import { CustomFieldDetailsSchema } from './form-schema';

export const useCustomFieldForm = (entity: CustomFieldAppliesToEntity) => {
  const navigate = useNavigate();

  const { loading, failure, success, dismiss } = useLoadingNotification();
  const { createCustomFieldDefinition } = useCreateCustomFieldDefinition();

  const form = useForm<FormValues>({
    resolver: zodResolver(CustomFieldDetailsSchema),
    defaultValues: {
      name: '',
      type: '',
      quantity: 'single'
    }
  });

  const onSubmit = async (values: FormValues) => {
    loading('Saving...');

    const isList = values.quantity === 'multiple';

    const isReference = values.type.includes(':');

    if (!isReference) {
      const result = await createCustomFieldDefinition({
        isList,
        appliesToEntity: entity,
        name: values.name,
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

      return;
    }

    const [type, targetEntity] = values.type.split(':');

    const result = await createCustomFieldDefinition({
      isList,
      appliesToEntity: entity,
      name: values.name,
      type: type as CustomFieldType,
      metadata: { targetEntity }
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

  return {
    ...form,
    onSubmit: form.handleSubmit(onSubmit)
  };
};

export type FormValues = z.infer<typeof CustomFieldDetailsSchema>;

export const useCustomFieldFormContext = () => useFormContext<FormValues>();
