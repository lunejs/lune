import { Badge, Item, ItemActions, ItemContent, ItemMedia, ItemTitle } from '@lunejs/ui';
import { ChevronRightIcon, StoreIcon } from 'lucide-react';
import { Link } from 'react-router';

import type { CommonLocationFragment } from '@/lib/api/types';

export const InStorePickupCard = ({ location }: Props) => {
  return (
    <Item variant={'outline'} size={'sm'} asChild>
      <Link to={`/settings/shipments/in-store-pickup/${location.id}`}>
        <ItemMedia>
          <StoreIcon size={20} />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Available for in store pickup</ItemTitle>
        </ItemContent>
        <ItemActions>
          <Badge variant={location.inStorePickup.isAvailable ? 'default' : 'secondary'}>
            {location.inStorePickup.isAvailable ? 'On' : 'Off'}
          </Badge>
          <ChevronRightIcon />
        </ItemActions>
      </Link>
    </Item>
  );
};

type Props = {
  location: CommonLocationFragment;
};
