import { useParams } from 'react-router';

import { P } from '@lunejs/ui';

import { useGetProductForTranslation } from '@/lib/product/hooks/use-get-product-for-translation';

import { TranslateHeader } from '../components/header/translate-header';
import { ProductTranslateList } from '../components/product-form/list/product-translate-list';
import { TranslateProductForm } from '../components/product-form/translate-product-form';

export const TranslateProductsPage = () => {
  const { id } = useParams() as TranslatePageParams;

  const { product } = useGetProductForTranslation(id);

  return (
    <div className="bg-sidebar min-h-screen flex p-4">
      <div className="bg-background rounded-xl overflow-hidden w-full">
        <TranslateHeader entitySelectorTitle="Products" />
        <main className="flex h-full">
          <ProductTranslateList
            className={{
              root: 'hidden lg:flex',
              list: 'h-[calc(100vh-69px-69px-32px)] overflow-y-auto'
            }}
          />
          {product ? (
            <TranslateProductForm product={product} />
          ) : (
            <div className="w-full border-l flex items-center justify-center">
              <P className="text-muted-foreground">Select a product to start translating</P>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export type TranslatePageParams = { id: string };
