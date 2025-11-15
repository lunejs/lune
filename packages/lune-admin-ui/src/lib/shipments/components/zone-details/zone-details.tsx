import { type FC } from 'react';

import { formatDate } from '@lune/common';
import { Button, Form, FormInput } from '@lune/ui';

import type { CommonZoneFragment } from '@/lib/api/types';
import { SettingsPageLayout } from '@/shared/components/layout/settings-page-layout';

import { ZoneCountrySelector } from './country-selector/zone-country-selector';
import { useZoneDetailsForm } from './use-form/use-form';

export const ZoneDetails: FC<Props> = ({ zone }) => {
  const form = useZoneDetailsForm(zone);

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
          actions={<Button disabled={form.formState.isSubmitting}>Save</Button>}
        >
          <div className="flex flex-col gap-4">
            <FormInput
              control={form.control}
              name="name"
              label="Name"
              placeholder="International"
            />
            <ZoneCountrySelector defaultSelected={zone?.states.map(s => s.id) ?? []} zone={zone} />
          </div>
        </SettingsPageLayout>
      </form>
    </Form>
  );
};

type Props = {
  zone?: CommonZoneFragment;
};
