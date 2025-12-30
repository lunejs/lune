import { ChevronRightIcon, CircleFadingPlusIcon, MapPinIcon, MapPinOffIcon } from 'lucide-react';
import { Link } from 'react-router';

import { add3dots } from '@lunejs/common';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle, cn, H4, Small } from '@lunejs/ui';

import type { CommonListLocationFragment } from '@/lib/api/types';

export const InStorePickupLocations = ({ locations }: Props) => {
  return (
    <Card className={cn('overflow-hidden', locations.length && 'pb-0')}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Your locations</CardTitle>
        <Link to={`/settings/locations`}>
          <Button size={'sm'} variant={'link'}>
            Manage
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        {!locations.length && (
          <div className="h-full w-full flex items-center justify-center flex-col gap-4 border-t pt-4">
            <Button size="icon" variant="outline">
              <MapPinOffIcon />
            </Button>
            <div className="flex flex-col gap-2 items-center">
              <H4>No Locations found</H4>
              <Small className="text-muted-foreground">
                Locations are use it to show in store pickup shipping.
              </Small>
            </div>
            <Link to={'/settings/locations/new'}>
              <Button variant={'outline'}>
                <CircleFadingPlusIcon /> Add location
              </Button>
            </Link>
          </div>
        )}
        {locations.map(location => {
          const description = `${location.streetLine1}, ${location.postalCode} ${location.city}, ${location.state.name}, ${location.country.name}`;
          return (
            <Link
              to={`/settings/shipments/in-store-pickup/${location.id}`}
              className="p-4 border-t flex items-center justify-between gap-4 hover:bg-muted/50 transition-colors"
              key={location.id}
            >
              <div className="flex items-center gap-3">
                <MapPinIcon size={20} />

                <div>
                  <p>{location.name}</p>
                  <p className="text-muted-foreground text-sm">{add3dots(description, 60)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {location.inStorePickup.isAvailable ? (
                  <Badge className="text-nowrap">Offers pickup</Badge>
                ) : (
                  <Badge variant="secondary" className="text-nowrap">
                    Doesn&apos;t offers pickup
                  </Badge>
                )}
                <ChevronRightIcon size={20} />
              </div>
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
};

type Props = {
  locations: CommonListLocationFragment[];
};
