import { useSearchParams } from 'react-router';

import type { DiscountHandler } from '@/lib/api/types';
import { PageLayout } from '@/shared/components/layout/page-layout';
import { NotFound } from '@/shared/components/not-found/not-found';

import { DiscountDetails } from '../components/details/discount-details';
import { useGetDiscountHandlers } from '../hooks/use-get-discount-handlers';

export const NewDiscountPage = () => {
  const [params] = useSearchParams();
  const { isLoading, discountHandlers } = useGetDiscountHandlers();

  const handlerCode = params.get('code');
  const handler = discountHandlers.find(h => h.code === handlerCode);

  if (!isLoading && !handler) return <NotFound />;

  return (
    <PageLayout className="max-w-5xl mx-auto w-full" isLoading={isLoading}>
      <DiscountDetails handler={handler as DiscountHandler} />
    </PageLayout>
  );
};
