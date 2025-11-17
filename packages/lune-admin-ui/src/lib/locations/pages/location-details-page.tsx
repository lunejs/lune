import { useParams } from 'react-router';

import { useGetCountries } from '@/lib/shipments/hooks/use-get-countries';
import { PageLoader } from '@/shared/components/loader/page-loader';

import { LocationDetails } from '../components/location-details/location-details';
import { useGetLocation } from '../hooks/use-get-location';

export default function LocationDetailsPage() {
  const { id } = useParams() as { id: string };

  const { isLoading, location } = useGetLocation(id);
  const { isLoading: isLoadingCountries, countries } = useGetCountries();

  if (isLoading || isLoadingCountries) return <PageLoader />;

  return <LocationDetails location={location} countries={countries} />;
}
