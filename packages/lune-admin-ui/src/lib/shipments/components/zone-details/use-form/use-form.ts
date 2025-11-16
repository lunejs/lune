import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFormContext, type UseFormReturn } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { type z } from 'zod';

import type { CommonCountryFragment, CommonZoneFragment } from '@/lib/api/types';
import { useLoadingNotification } from '@/shared/hooks/use-loading-notification';

import { useCreateZone } from '../../../hooks/use-create-zone';
import { useUpdateZone } from '../../../hooks/use-update-zone';

import { ZoneDetailsFormSchema as schema } from './form-schema';

export const useZoneDetailsForm = (
  zone: CommonZoneFragment | null,
  countries: CommonCountryFragment[]
) => {
  const navigate = useNavigate();

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

  useEffect(() => {
    form.reset({
      name: zone?.name ?? '',
      states: zone?.states ?? []
    });
  }, [zone]);

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
    navigate(`/settings/shipments/${result.data.id}`);
  }

  return {
    ...form,
    onSubmit: form.handleSubmit(onSubmit),
    countries,
    zone
  };
};

export type ZoneDetailsFormValues = z.infer<typeof schema>;

export const useZoneFormDetailsContext = () =>
  useFormContext<ZoneDetailsFormValues>() as HookReturn;

type HookReturn = UseFormReturn<ZoneDetailsFormValues> & {
  zone: CommonZoneFragment;
  countries: CommonCountryFragment[];
};
