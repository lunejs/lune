import { PageLayout } from '@/shared/components/layout/page-layout';

import { ProductDetails } from '../components/product-details/product-details';

export const NewProductPage = () => {
  return (
    <PageLayout className="max-w-5xl mx-auto w-full">
      <ProductDetails />
    </PageLayout>
  );
};
