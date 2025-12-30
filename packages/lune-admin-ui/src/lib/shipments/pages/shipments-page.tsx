import {
  Button,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle
} from '@lunejs/ui';
import { ChevronRight, StoreIcon } from 'lucide-react';
import { Link } from 'react-router';

import { SettingsPageLayout } from '@/shared/components/layout/settings-page-layout';

import { ZonesTable } from '../components/zones-table/zones-table';

export const ShipmentsPage = () => {
  return (
    <SettingsPageLayout
      title="Shipments"
      subtitle="Manage your rates depending on your zones"
      className="flex flex-col gap-4"
    >
      <ZonesTable />
      <Item variant="outline" size="default">
        <ItemMedia variant={'icon'}>
          <StoreIcon size={20} />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>In Store Pickup</ItemTitle>
          <ItemDescription>
            Let customers pick up their online orders in your store.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Link to="/settings/shipments/in-store-pickup">
            <Button variant={'link'} className="group">
              Settings <ChevronRight />
            </Button>
          </Link>
        </ItemActions>
      </Item>
    </SettingsPageLayout>
  );
};
