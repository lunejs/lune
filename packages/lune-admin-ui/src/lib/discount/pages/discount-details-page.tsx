import { useParams } from 'react-router';

import type { DiscountHandler } from '@/lib/api/types';
import { PageLayout } from '@/shared/components/layout/page-layout';
import { NotFound } from '@/shared/components/not-found/not-found';

import { DiscountDetails } from '../components/details/discount-details';
import { useGetDiscount } from '../hooks/use-get-discount';
import { useGetDiscountHandlers } from '../hooks/use-get-discount-handlers';

export const DiscountDetailsPage = () => {
  const { id } = useParams() as { id: string };

  const { isLoading: isLoadingHandlers, discountHandlers } = useGetDiscountHandlers();
  const { isLoading, discount } = useGetDiscount(id);

  const handler = discountHandlers.find(h => h.code === discount?.handler.code);

  if (!isLoading && !discount) return <NotFound />;

  return (
    <PageLayout className="max-w-5xl mx-auto w-full" isLoading={isLoading || isLoadingHandlers}>
      <DiscountDetails handler={handler as DiscountHandler} discount={discount} />
    </PageLayout>
  );
};
