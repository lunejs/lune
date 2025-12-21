import { CustomFieldAppliesToEntity } from '@/lib/api/types';
import { useGetCustomFieldDefinitions } from '@/lib/custom-fields/hooks/use-get-custom-field-definitions';
import { PageLayout } from '@/shared/components/layout/page-layout';
import { PageLoader } from '@/shared/components/loader/page-loader';

import { ProductDetails } from '../components/product-details/product-details';

export const NewProductPage = () => {
  const { isLoading, customFieldDefinitions } = useGetCustomFieldDefinitions({
    filters: { appliesToEntity: CustomFieldAppliesToEntity.Product }
  });

  if (isLoading) return <PageLoader />;

  return (
    <PageLayout className="max-w-5xl mx-auto w-full">
      <ProductDetails customFields={customFieldDefinitions} />
    </PageLayout>
  );
};
