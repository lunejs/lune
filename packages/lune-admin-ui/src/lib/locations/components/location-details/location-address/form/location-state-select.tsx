import { useEffect, useMemo } from 'react';
import { FormSelect } from '@lunejs/ui';

import { useLocationDetailsFormContext } from '../../use-form/use-form';

export const LocationStateSelect = () => {
  const { countries, control, watch, setValue, getValues } = useLocationDetailsFormContext();

  const selectedCountry = watch('country');

  const states = useMemo(() => {
    const country = countries.find(c => c.id === selectedCountry);
    return country?.states ?? [];
  }, [selectedCountry]);

  useEffect(() => {
    const defaultProvince = getValues('province');

    const country = countries.find(c => c.id === selectedCountry);

    if (country?.states.find(s => s.id === defaultProvince)) return;

    setValue('province', states[0]?.id);
  }, [selectedCountry]);

  return (
    <FormSelect
      control={control}
      name="province"
      label="Province"
      items={states.map(s => ({ label: s.name, value: s.id }))}
    />
  );
};
