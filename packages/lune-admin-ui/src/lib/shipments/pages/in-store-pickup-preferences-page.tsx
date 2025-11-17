import { useParams } from 'react-router';

import { useGetLocation } from '@/lib/locations/hooks/use-get-location';
import { PageLoader } from '@/shared/components/loader/page-loader';

import { PickupInStoreDetails } from '../components/in-store-pickup/in-store-pickup-form';

export const InStorePickupPreferencesPage = () => {
  const { id } = useParams() as { id: string };
  const { isLoading, location } = useGetLocation(id);

  if (isLoading) return <PageLoader />;

  // TODO: add 404
  if (!location) return null;

  return <PickupInStoreDetails location={location} />;
};
