import { formatDate } from '@lune/common';
import { Form, FormInput } from '@lune/ui';

import type { CommonCountryFragment, CommonZoneFragment } from '@/lib/api/types';
import { SettingsPageLayout } from '@/shared/components/layout/settings-page-layout';

import { ZoneActions } from './actions/zone-actions';
import { ZoneDetailsSubmitButton } from './use-form/submit-button';
import { useZoneDetailsForm } from './use-form/use-form';
import { ZoneCountries } from './zone-countries/zone-countries';
import { ShippingMethodsTable } from './zone-shipping-methods/shipping-methods-table';

export const ZoneDetails = ({ countries, zone }: Props) => {
  const form = useZoneDetailsForm(zone ?? null, countries);

  return (
    <Form {...form}>
      <form onSubmit={form.onSubmit}>
        <SettingsPageLayout
          backUrl={`/settings/shipments`}
          title={zone ? zone.name : 'Create zone'}
          subtitle={
            zone
              ? `Created at ${formatDate(new Date(String(zone.createdAt)))}`
              : 'Create zones to add rates for places you want to deliver.'
          }
          actions={
            <div className="flex items-center gap-2">
              {zone && <ZoneActions zone={zone} />}
              <ZoneDetailsSubmitButton />
            </div>
          }
        >
          <div className="flex flex-col gap-4">
            <FormInput
              control={form.control}
              name="name"
              label="Name"
              placeholder="International"
            />
            <ZoneCountries />
            {zone && <ShippingMethodsTable shippingMethods={zone.shippingMethods} />}
          </div>
        </SettingsPageLayout>
      </form>
    </Form>
  );
};

type Props = {
  countries: CommonCountryFragment[];
  zone?: CommonZoneFragment | null;
};
