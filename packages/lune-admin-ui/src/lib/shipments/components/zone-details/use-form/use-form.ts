import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFormContext } from 'react-hook-form';
import type { z } from 'zod';

import type { CommonZoneFragment } from '@/lib/api/types';
import { useLoadingNotification } from '@/shared/hooks/use-loading-notification';

import { useCreateZone } from '../../../hooks/use-create-zone';
import { useUpdateZone } from '../../../hooks/use-update-zone';

import { ZoneDetailsFormSchema as schema } from './form-schema';

export const useZoneDetailsForm = (zone?: CommonZoneFragment) => {
  const { loading, success, failure } = useLoadingNotification();
  const { createZone } = useCreateZone();
  const { updateZone } = useUpdateZone();

  const form = useForm<ZoneDetailsFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: zone?.name ?? '',
      states: zone?.states ?? []
    }
  });

  async function onSubmit(values: ZoneDetailsFormValues) {
    if (zone) {
      loading('Saving...');

      const result = await updateZone({
        id: zone.id,
        input: { name: values.name, stateIds: values.states.map(s => s.id) }
      });

      if (!result.isSuccess) {
        failure(result.error);
        return;
      }

      success('Zone saved');

      return;
    }

    loading('Saving...');

    const result = await createZone({ name: values.name, stateIds: values.states.map(s => s.id) });

    if (!result.isSuccess) {
      failure(result.error);
      return;
    }

    success('Zone saved');
  }

  return {
    ...form,
    onSubmit: form.handleSubmit(onSubmit)
  };
};

export type ZoneDetailsFormValues = z.infer<typeof schema>;

export const useZoneFormDetailsContext = () => useFormContext<ZoneDetailsFormValues>();
