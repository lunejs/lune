import { MapPinIcon } from 'lucide-react';

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Form,
  FormSwitch,
  FormTextarea
} from '@lune/ui';

import type { CommonLocationFragment } from '@/lib/api/types';
import { SettingsPageLayout } from '@/shared/components/layout/settings-page-layout';

import { usePickupInStoreForm } from './use-form/use-form';

export const PickupInStoreDetails = ({ location }: Props) => {
  const form = usePickupInStoreForm(location);

  const description = `${location.streetLine1}, ${location.postalCode} ${location.city}, ${location.state.name}, ${location.country.name}`;

  return (
    <Form {...form}>
      <form onSubmit={form.onSubmit}>
        <SettingsPageLayout
          backUrl={`/settings/shipments/in-store-pickup`}
          title={`In store pickup for ${location.name}`}
          subtitle="Let customers pick up their orders at this location"
          actions={
            <Button disabled={!form.formState.isDirty || form.formState.isSubmitting}>Save</Button>
          }
          className="flex flex-col gap-4"
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Accepts in store pickup</CardTitle>
                <CardDescription>
                  Let customers pick up their orders at this location
                </CardDescription>
              </div>
              <div className="flex items-center gap-4">
                <FormSwitch control={form.control} name="isAvailable" />
              </div>
            </CardHeader>
            <CardContent className="border-t pt-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MapPinIcon size={20} />

                <div>
                  <p>{location.name}</p>
                  <p className="text-muted-foreground text-sm">{description}</p>
                </div>
              </div>
              {/* <PostalCodeRanges /> */}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Instructions</CardTitle>
              <CardDescription>
                This message will be sent when the order is marked as ready for pickup
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormTextarea
                control={form.control}
                name="instructions"
                placeholder="Bring your confirmation email when you come to collect your order."
              />
            </CardContent>
          </Card>
        </SettingsPageLayout>
      </form>
    </Form>
  );
};

type Props = {
  location: CommonLocationFragment;
};
