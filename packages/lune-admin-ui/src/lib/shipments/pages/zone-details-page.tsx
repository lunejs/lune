import { useParams } from 'react-router';

import { PageLoader } from '@/shared/components/loader/page-loader';

import { ZoneDetails } from '../components/zone-details/zone-details';
import { useGetCountries } from '../hooks/use-get-countries';
import { useGetZone } from '../hooks/use-get-zone';

export const ZoneDetailsPage = () => {
  const { id } = useParams() as { id: string };

  const { isLoading, zone } = useGetZone(id);
  const { isLoading: isLoadingCountries, countries } = useGetCountries();

  if (isLoading && isLoadingCountries) return <PageLoader />;

  return <ZoneDetails zone={zone} countries={countries} />;
};
