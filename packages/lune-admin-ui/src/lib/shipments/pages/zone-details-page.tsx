import { useParams } from 'react-router';

import { PageLoader } from '@/shared/components/loader/page-loader';

import { ZoneDetails } from '../components/zone-details/zone-details';
import { useGetCountries } from '../hooks/use-get-countries';
import { useGetShippingHandlers } from '../hooks/use-get-shipping-handlers';
import { useGetZone } from '../hooks/use-get-zone';

export const ZoneDetailsPage = () => {
  const { id } = useParams() as { id: string };

  const { isLoading, zone } = useGetZone(id);
  const { isLoading: isLoadingCountries, countries } = useGetCountries();
  const { isLoading: isLoadingHandlers, shippingHandlers } = useGetShippingHandlers();

  if (isLoading && isLoadingCountries && isLoadingHandlers) return <PageLoader />;

  return <ZoneDetails zone={zone} handlers={shippingHandlers} countries={countries} />;
};
