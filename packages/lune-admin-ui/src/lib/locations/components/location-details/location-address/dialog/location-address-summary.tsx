import { ChevronRightIcon, MapPinIcon } from 'lucide-react';

import { Card, CardDescription, CardHeader, CardTitle, useDialogContext } from '@lune/ui';

import { useLocationDetailsFormContext } from '../../use-form/use-form';

export const LocationAddressSummary = () => {
  const { location } = useLocationDetailsFormContext();
  const { setIsOpen } = useDialogContext();

  if (!location) return null;

  return (
    <Card
      onClick={() => setIsOpen(true)}
      className="hover:bg-muted/50 transition-colors cursor-pointer"
    >
      <CardHeader className="flex flex-row items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <MapPinIcon size={20} />
          <div className="flex flex-col gap-1">
            <CardTitle>Address</CardTitle>
            <CardDescription>
              {location.streetLine1}, {location.postalCode} {location.city} {location.state.name},{' '}
              {location.country.name}
            </CardDescription>
          </div>
        </div>

        <ChevronRightIcon size={20} />
      </CardHeader>
    </Card>
  );
};

LocationAddressSummary.displayName = 'LocationAddressCard';
