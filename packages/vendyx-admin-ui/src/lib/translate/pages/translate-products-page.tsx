import { useParams } from 'react-router';

import { useGetProductForTranslation } from '@/lib/product/hooks/use-get-product-for-translation';

import { TranslateHeader } from '../components/header/translate-header';
import { TranslateList } from '../components/list/translate-list';
import { TranslateProductForm } from '../components/product-form/translate-product-form';

export const TranslateProductsPage = () => {
  const { id } = useTranslateProductsPageParams();

  const { product } = useGetProductForTranslation(id);
  console.log({ product });

  return (
    <div className="bg-sidebar min-h-screen p-4">
      <div className="bg-background h-full rounded-xl overflow-hidden">
        <TranslateHeader />
        <main className="flex h-full">
          <TranslateList />
          {product && <TranslateProductForm product={product} />}
        </main>
      </div>
    </div>
  );
};

export const useTranslateProductsPageParams = () => useParams() as { id: string };
