import { FormInput, FormPhoneInput, FormSelect } from '@lunejs/ui';

import { useLocationDetailsFormContext } from '../../use-form/use-form';

import { LocationStateSelect } from './location-state-select';

export const LocationAddressForm = () => {
  const { countries, control } = useLocationDetailsFormContext();

  return (
    <div className="flex flex-col gap-4">
      <FormPhoneInput control={control} name="phoneNumber" label="Phone number" />
      <FormSelect
        control={control}
        name="country"
        label="Country"
        items={countries.map(c => ({ label: c.name, value: c.id }))}
      />
      <FormInput
        control={control}
        name="streetLine1"
        label="Address"
        placeholder="1234 Industrial Blvd, Suite 200"
      />
      <FormInput control={control} name="streetLine2" label="Apartment, suit, etc." />
      <div className="flex items-center gap-4">
        <FormInput control={control} name="city" label="City" placeholder="Dallas" />
        <FormInput control={control} name="postalCode" label="Postal code" placeholder="75247" />
      </div>
      <LocationStateSelect />
    </div>
  );
};
