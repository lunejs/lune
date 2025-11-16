import { PageLoader } from '@/shared/components/loader/page-loader';

import { ZoneDetails } from '../components/zone-details/zone-details';
import { useGetCountries } from '../hooks/use-get-countries';

export const NewZonePage = () => {
  const { isLoading, countries } = useGetCountries();

  if (isLoading) return <PageLoader />;

  return <ZoneDetails countries={countries} />;
};
