import { useParams } from 'react-router';

import { useGetProducts } from '@/lib/product/hooks/use-get-products';

import { TranslateHeader } from '../components/header/translate-header';
import { TranslateList } from '../components/list/translate-list';
import { TranslateProductForm } from '../components/product-form/translate-product-form';

export const TranslateProductsPage = () => {
  const { id } = useTranslateProductsPageParams();

  const { products } = useGetProducts({ filters: { archived: { equals: false } } });

  const productSelected = products?.find(p => p.id === id);

  return (
    <div className="bg-sidebar h-screen p-4">
      <div className="bg-background h-full rounded-xl overflow-hidden">
        <TranslateHeader />
        <main className="flex h-full">
          <TranslateList entities={products} entityId={id} />
          {productSelected && <TranslateProductForm product={productSelected} />}
        </main>
      </div>
    </div>
  );
};

export const useTranslateProductsPageParams = () => useParams() as { id: string };
