import { useParams } from 'react-router';

import { CustomFieldAppliesToEntity } from '@/lib/api/types';
import { useGetCustomFieldDefinitions } from '@/lib/custom-fields/hooks/use-get-custom-field-definitions';
import { PageLayout } from '@/shared/components/layout/page-layout';
import { PageLoader } from '@/shared/components/loader/page-loader';
import { NotFound } from '@/shared/components/not-found/not-found';

import { ProductDetails } from '../components/product-details/product-details';
import { useGetProduct } from '../hooks/use-get-product';

export const ProductDetailsPage = () => {
  const params = useParams();

  const { isLoading, product } = useGetProduct(params.id ?? '');
  const { isLoading: isLoadingCustomFields, customFieldDefinitions } = useGetCustomFieldDefinitions(
    {
      filters: { appliesToEntity: CustomFieldAppliesToEntity.Product }
    }
  );

  if (isLoading || isLoadingCustomFields) return <PageLoader />;

  if (!isLoading && !product) return <NotFound />;

  return (
    <PageLayout className="max-w-5xl mx-auto w-full" isLoading={isLoading}>
      <ProductDetails customFields={customFieldDefinitions} product={product} />
    </PageLayout>
  );
};
