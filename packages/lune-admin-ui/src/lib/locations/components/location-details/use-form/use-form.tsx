import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFormContext, type UseFormReturn } from 'react-hook-form';
import { useNavigate } from 'react-router';
import type { z } from 'zod';

import type { CommonCountryFragment, CommonLocationFragment } from '@/lib/api/types';
import { useCreateLocation } from '@/lib/locations/hooks/use-create-location';
import { useUpdateLocation } from '@/lib/locations/hooks/use-update-location';
import { useLoadingNotification } from '@/shared/hooks/use-loading-notification';

import { LocationDetailsSchema as schema } from './form-schema';

export const useLocationDetailsForm = (
  location: CommonLocationFragment | null,
  countries: CommonCountryFragment[]
) => {
  const navigate = useNavigate();
  const { loading, failure, success } = useLoadingNotification();
  const { createLocation } = useCreateLocation();
  const { updateLocation } = useUpdateLocation();

  const defaultCountry = countries.find(c => c.id === location?.country.id) ?? countries[0];
  const defaultState =
    defaultCountry.states.find(s => s.name === location?.state.name) ?? defaultCountry.states[0];

  const form = useForm<LocationDetailsFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: location?.name ?? '',
      phoneNumber: location?.phoneNumber ?? '',
      country: defaultCountry.id,
      streetLine1: location?.streetLine1 ?? '',
      streetLine2: location?.streetLine2 ?? '',
      city: location?.city ?? '',
      postalCode: location?.postalCode ?? '',
      province: defaultState.id
    }
  });

  async function onSubmit(values: LocationDetailsFormValues) {
    if (location) {
      loading('Saving...');

      const result = await updateLocation({
        id: location.id,
        input: {
          name: values.name,
          city: values.city,
          countryId: values.country,
          phoneNumber: values.phoneNumber,
          postalCode: values.postalCode,
          stateId: values.province,
          streetLine1: values.streetLine1,
          streetLine2: values.streetLine2
        }
      });

      if (!result.isSuccess) {
        failure(result.error);
        return;
      }

      success('Location updated');
      return;
    }

    loading('Saving...');

    const result = await createLocation({
      name: values.name,
      city: values.city,
      countryId: values.country,
      phoneNumber: values.phoneNumber,
      postalCode: values.postalCode,
      stateId: values.province,
      streetLine1: values.streetLine1,
      streetLine2: values.streetLine2
    });

    if (!result.isSuccess) {
      failure(result.error);
      return;
    }

    success('Location created');
    navigate(`/settings/locations/${result.data.id}`);
  }

  return {
    ...form,
    location,
    countries,
    onSubmit: form.handleSubmit(onSubmit)
  };
};

export type LocationDetailsFormValues = z.infer<typeof schema>;

export const useLocationDetailsFormContext = () =>
  useFormContext<LocationDetailsFormValues>() as UseFormReturn<LocationDetailsFormValues> & {
    location: CommonLocationFragment;
    countries: CommonCountryFragment[];
  };
