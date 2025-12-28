import { useMemo } from 'react';

import { SettingsPageLayout } from '@/shared/components/layout/settings-page-layout';
import { PageLoader } from '@/shared/components/loader/page-loader';
import { NotFound } from '@/shared/components/not-found/not-found';
import { getCookie } from '@/shared/cookies';
import { CookiesKeys } from '@/shared/cookies/keys';

import { ShopDetails } from '../components/details/shop-details';
import { useGetShop } from '../hooks/use-get-shop';

export const ShopDetailsPage = () => {
  const shopId = useMemo(() => getCookie(CookiesKeys.ActiveShop), []);
  const { isLoading, shop } = useGetShop(shopId ?? '');

  if (isLoading) return <PageLoader />;

  if (!shop) return <NotFound />;

  return (
    <SettingsPageLayout title="Shop settings" subtitle="Update your store settings.">
      <ShopDetails shop={shop} />
    </SettingsPageLayout>
  );
};
