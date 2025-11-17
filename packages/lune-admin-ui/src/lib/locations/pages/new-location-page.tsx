import { useGetCountries } from '@/lib/shipments/hooks/use-get-countries';
import { PageLoader } from '@/shared/components/loader/page-loader';

import { LocationDetails } from '../components/location-details/location-details';

export default function NewLocationPage() {
  const { isLoading, countries } = useGetCountries();

  if (isLoading) return <PageLoader />;

  return <LocationDetails countries={countries} />;
}
