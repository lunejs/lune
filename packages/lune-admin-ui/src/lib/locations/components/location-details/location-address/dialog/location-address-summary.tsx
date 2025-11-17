import { MapPinIcon } from 'lucide-react';

import {
  Button,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
  useDialogContext
} from '@lune/ui';

import { useLocationDetailsFormContext } from '../../use-form/use-form';

export const LocationAddressSummary = () => {
  const { location } = useLocationDetailsFormContext();
  const { setIsOpen } = useDialogContext();

  if (!location) return null;

  return (
    <Item variant="outline" size="default">
      <ItemMedia variant={'icon'}>
        <MapPinIcon size={20} />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Address</ItemTitle>
        <ItemDescription>
          {location.streetLine1}, {location.postalCode} {location.city} {location.state.name},{' '}
          {location.country.name}
        </ItemDescription>
      </ItemContent>
      <ItemActions onClick={() => setIsOpen(true)}>
        <Button type="button" variant="outline" size="sm">
          Edit
        </Button>
      </ItemActions>
    </Item>
  );
};

LocationAddressSummary.displayName = 'LocationAddressCard';
