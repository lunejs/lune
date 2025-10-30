import { useParams } from 'react-router';

import { useGetProductForTranslation } from '@/lib/product/hooks/use-get-product-for-translation';

import { TranslateHeader } from '../components/header/translate-header';
import { TranslateList } from '../components/list/translate-list';
import { TranslateProductForm } from '../components/product-form/translate-product-form';

export const TranslateProductsPage = () => {
  const { id } = useParams() as TranslatePageParams;

  const { product } = useGetProductForTranslation(id);

  return (
    <div className="bg-sidebar min-h-screen flex p-4">
      <div className="bg-background rounded-xl overflow-hidden w-full">
        <TranslateHeader />
        <main className="flex h-full">
          <TranslateList className="hidden lg:flex" />
          {product && <TranslateProductForm product={product} />}
        </main>
      </div>
    </div>
  );
};

export type TranslatePageParams = { id: string };

//
// add field resolvers for fields in option for translations (like in product where you hve for name, description and slug)
