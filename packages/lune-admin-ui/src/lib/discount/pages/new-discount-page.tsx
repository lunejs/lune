import { useSearchParams } from 'react-router';

import { PageLayout } from '@/shared/components/layout/page-layout';
import { NotFound } from '@/shared/components/not-found/not-found';

import { useGetDiscountHandlers } from '../hooks/use-get-discount-handlers';

export const NewDiscountPage = () => {
  const [params] = useSearchParams();
  const { discountHandlers } = useGetDiscountHandlers();

  const handlerCode = params.get('code');
  const handler = discountHandlers.find(h => h.code === handlerCode);

  if (!handler) return <NotFound />;

  return <PageLayout>{handler.name}</PageLayout>;
};
