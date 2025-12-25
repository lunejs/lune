import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFormContext, type UseFormReturn } from 'react-hook-form';
import { useNavigate } from 'react-router';
import type z from 'zod';

import { isTruthy } from '@lune/common';
import { notification } from '@lune/ui';

import type { CustomFieldType } from '@/lib/api/types';
import { CustomObjectDefinitionErrorCode } from '@/lib/api/types';
import {
  type CommonCustomObjectDefinitionFragment,
  CustomFieldAppliesToEntity
} from '@/lib/api/types';
import { useCreateCustomObjectDefinition } from '@/lib/custom-object-definition/hooks/use-create-custom-object-definition';
import { useUpdateCustomObjectDefinition } from '@/lib/custom-object-definition/hooks/use-update-custom-object-definition';
import { useLoadingNotification } from '@/shared/hooks/use-loading-notification';

import { buildCustomObjectDefaults } from './build-defaults';
import { CustomObjectFormSchema as schema } from './form-schema';

export const useCustomObjectForm = (definition: CommonCustomObjectDefinitionFragment | null) => {
  const navigate = useNavigate();
  const { loading, dismiss, failure, success } = useLoadingNotification();

  const { createCustomObjectDefinition } = useCreateCustomObjectDefinition();
  const { updateCustomObjectDefinition } = useUpdateCustomObjectDefinition();

  const form = useForm({
    resolver: zodResolver(schema as any),
    defaultValues: buildCustomObjectDefaults(definition)
  });

  useEffect(() => {
    form.reset(buildCustomObjectDefaults(definition));
  }, [definition]);

  const onSubmit = async (values: FormValues) => {
    const names = values.fields.map(f => f.name);
    const isAnyRepeated = new Set(names).size !== names.length;

    if (isAnyRepeated) {
      notification.error('Field labels should be unique');
      return;
    }

    if (definition) {
      loading('Saving...');

      const result = await updateCustomObjectDefinition(definition.id, {
        name: values.name,
        displayFieldName: values.displayField === 'auto' ? null : values.displayField,
        fields: values.fields
          .map((field, i) => {
            if (!field.fieldId) return;

            return {
              id: field.fieldId,
              name: field.name,
              order: i
            };
          })
          .filter(isTruthy),
        newFields: values.fields
          .map((field, i) => {
            if (field.fieldId) return;

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
          .filter(isTruthy)
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
    } else {
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
    }
  };

  return {
    ...form,
    definition,
    onSubmit: form.handleSubmit(onSubmit)
  };
};

export type FormValues = z.infer<typeof schema>;

export const useCustomObjectFormContext = () => useFormContext<FormValues>() as Return;

type Return = UseFormReturn<FormValues> & { definition?: CommonCustomObjectDefinitionFragment };
