import { ChevronRight, StoreIcon } from 'lucide-react';
import { Link } from 'react-router';

import { Button, Card, CardDescription, CardHeader, CardTitle } from '@lune/ui';

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
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <StoreIcon size={20} className="shrink-0" />
            <div className="flex flex-col gap-1">
              <CardTitle>In store pickup</CardTitle>
              <CardDescription>
                Let customers pick up their online orders in your store.
              </CardDescription>
            </div>
          </div>

          <Link to="/settings/shipments/in-store-pickup">
            <Button variant={'link'} className="group">
              Settings <ChevronRight />
            </Button>
          </Link>
        </CardHeader>
      </Card>
    </SettingsPageLayout>
  );
};
