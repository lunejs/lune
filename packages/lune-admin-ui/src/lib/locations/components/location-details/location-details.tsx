import { formatDate } from '@lune/common';
import { Form, FormInput } from '@lune/ui';

import type { CommonCountryFragment, CommonLocationFragment } from '@/lib/api/types';
import { SettingsPageLayout } from '@/shared/components/layout/settings-page-layout';

import { LocationAddressDialog } from './location-address/dialog/location-address-dialog';
import { LocationAddressForm } from './location-address/form/location-address-form';
import { LocationSubmitButton } from './use-form/submit-button';
import { useLocationDetailsForm } from './use-form/use-form';

export const LocationDetails = ({ location, countries }: Props) => {
  const form = useLocationDetailsForm(location ?? null, countries);

  return (
    <Form {...form}>
      <form onSubmit={form.onSubmit}>
        <SettingsPageLayout
          title={location ? location.name : 'Add location'}
          subtitle={
            location
              ? formatDate(new Date(location.createdAt))
              : 'Add a location to your store to start receiving in-store pickup orders.'
          }
          backUrl="/settings/locations"
          actions={<LocationSubmitButton />}
        >
          <div className="flex flex-col gap-4">
            <FormInput
              control={form.control}
              name="name"
              description="Name to identify this location."
              label="Name"
              placeholder="Paris warehouse"
              tooltip={
                <span>
                  If this location offers in store pick up <br /> his name will be visible to your
                  customers <br />
                  at checkout and in notifications.
                </span>
              }
            />
            {location ? <LocationAddressDialog /> : <LocationAddressForm />}

            {/* {location ? <LocationAddressDialog /> : <LocationAddressForm />}
            {location && <InStorePickupCard />}
            {location && (
              <div className="w-full flex justify-end gap-2">
                <ToggleActiveLocationButton />
                <RemoveLocationButton />
              </div>
            )} */}
          </div>
        </SettingsPageLayout>
      </form>
    </Form>
  );
};

type Props = {
  location?: CommonLocationFragment | null;
  countries: CommonCountryFragment[];
};
