import { PageLayout } from '@/lib/shared/components/layout/page-layout';

import { ProductDetails } from '../components/product-details/product-details';

export const NewProductPage = () => {
  return (
    <PageLayout className="max-w-[900px] mx-auto w-full">
      <ProductDetails />
    </PageLayout>
  );
};
