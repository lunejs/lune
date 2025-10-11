import { useParams } from 'react-router';

import { PageLayout } from '@/lib/shared/components/layout/page-layout';

import { ProductDetails } from '../components/product-details/product-details';
import { useGetProduct } from '../hooks/use-get-product';

export const ProductDetailsPage = () => {
  const params = useParams();

  const { isLoading, product } = useGetProduct(params.id ?? '');

  if (isLoading) return <h1>Loading</h1>;

  return (
    <PageLayout className="max-w-[900px] mx-auto w-full">
      <ProductDetails product={product} />
    </PageLayout>
  );
};
