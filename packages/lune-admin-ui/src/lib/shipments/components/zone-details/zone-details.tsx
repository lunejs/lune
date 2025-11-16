import { formatDate } from '@lune/common';
import { Form, FormInput } from '@lune/ui';

import type { CommonCountryFragment, CommonZoneFragment } from '@/lib/api/types';
import { SettingsPageLayout } from '@/shared/components/layout/settings-page-layout';

import { ZoneDetailsSubmitButton } from './use-form/submit-button';
import { useZoneDetailsForm } from './use-form/use-form';
import { ZoneCountries } from './zone-countries/zone-countries';

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
          actions={<ZoneDetailsSubmitButton />}
        >
          <div className="flex flex-col gap-4">
            <FormInput
              control={form.control}
              name="name"
              label="Name"
              placeholder="International"
            />
            <ZoneCountries />
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
