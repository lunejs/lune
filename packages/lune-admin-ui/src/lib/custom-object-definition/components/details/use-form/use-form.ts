import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFormContext, type UseFormReturn } from 'react-hook-form';
import { useNavigate } from 'react-router';
import type z from 'zod';

import { notification } from '@lune/ui';

import { type CustomFieldType, CustomObjectDefinitionErrorCode } from '@/lib/api/types';
import {
  type CommonCustomObjectDefinitionFragment,
  CustomFieldAppliesToEntity
} from '@/lib/api/types';
import { useCreateCustomObjectDefinition } from '@/lib/custom-object-definition/hooks/use-create-custom-object-definition';
import { useLoadingNotification } from '@/shared/hooks/use-loading-notification';

import { CustomObjectFormSchema as schema } from './form-schema';

export const useCustomObjectForm = () => {
  const navigate = useNavigate();
  const { loading, dismiss, failure, success } = useLoadingNotification();

  const { createCustomObjectDefinition } = useCreateCustomObjectDefinition();

  const form = useForm({
    resolver: zodResolver(schema as any),
    defaultValues: {
      name: '',
      displayField: 'auto',
      fields: [{ name: '', quantity: 'single', type: '' }]
    }
  });

  const onSubmit = async (values: FormValues) => {
    const names = values.fields.map(f => f.name);
    const isAnyRepeated = new Set(names).size !== names.length;

    if (isAnyRepeated) {
      notification.error('Field labels should be unique');
      return;
    }

    loading('Saving...');

    const result = await createCustomObjectDefinition({
      name: values.name,
      displayFieldName: values.displayField === 'auto' ? null : values.displayField,
      fields: values.fields.map((field, i) => {
        const isList = field.quantity === 'multiple';
        const isReference = field.type.includes(':');
        const [type, targetEntity] = field.type.split(':');

        return {
          isList,
          appliesToEntity: CustomFieldAppliesToEntity.CustomObject,
          name: field.name,
          order: i,
          type: isReference ? (type as CustomFieldType) : (field.type as CustomFieldType),
          ...(targetEntity && { metadata: { targetEntity } })
        };
      })
    });

    if (!result.isSuccess) {
      if (result.errorCode === CustomObjectDefinitionErrorCode.KeyAlreadyExists) {
        dismiss();
        form.setError('name', {
          message: 'Generated key is already used, try with another name'
        });

        return;
      }

      failure(result.error);
      return;
    }

    success('Custom object created');
    navigate(`/settings/custom-objects/${result.data.id}`);
  };

  return {
    ...form,
    onSubmit: form.handleSubmit(onSubmit)
  };
};

export type FormValues = z.infer<typeof schema>;

export const useCustomObjectFormContext = () => useFormContext<FormValues>() as Return;

type Return = UseFormReturn<FormValues> & { definition?: CommonCustomObjectDefinitionFragment };
