import { useParams } from 'react-router';

import { PageLayout } from '@/shared/components/layout/page-layout';
import { NotFound } from '@/shared/components/not-found/not-found';

import { ProductDetails } from '../components/product-details/product-details';
import { useGetProduct } from '../hooks/use-get-product';

export const ProductDetailsPage = () => {
  const params = useParams();

  const { isLoading, product } = useGetProduct(params.id ?? '');

  if (!isLoading && !product) return <NotFound />;

  return (
    <PageLayout className="max-w-5xl mx-auto w-full" isLoading={isLoading}>
      <ProductDetails product={product} />
    </PageLayout>
  );
};
