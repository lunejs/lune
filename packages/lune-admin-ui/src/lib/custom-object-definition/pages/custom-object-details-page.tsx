import { useParams } from 'react-router';

import { PageLoader } from '@/shared/components/loader/page-loader';

import { CustomObjectDetails } from '../components/details/custom-object-details';
import { useGetCustomObjectDefinition } from '../hooks/use-get-custom-object-definition';

export const CustomObjectDetailsPage = () => {
  const { id } = useParams() as { id: string };

  const { isLoading, customObjectDefinition } = useGetCustomObjectDefinition(id);

  if (isLoading) return <PageLoader />;

  return <CustomObjectDetails definition={customObjectDefinition} />;
};
