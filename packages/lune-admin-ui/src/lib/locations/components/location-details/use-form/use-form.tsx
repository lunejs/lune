import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFormContext, type UseFormReturn } from 'react-hook-form';
import type { z } from 'zod';

import { notification } from '@lune/ui';

import type { CommonCountryFragment, CommonLocationFragment } from '@/lib/api/types';

import { LocationDetailsSchema as schema } from './form-schema';

export const useLocationDetailsForm = (
  location: CommonLocationFragment | null,
  countries: CommonCountryFragment[]
) => {
  const defaultCountry = countries.find(c => c.name === location?.country.name) ?? countries[0];
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
    const country = countries.find(c => c.id === values.country);
    const state = country?.states.find(s => s.id === values.province);

    if (!country) {
      notification.error('Invalid country selected');
      return;
    }

    if (!state) {
      notification.error('Invalid state selected');
      return;
    }

    console.log(values);
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
