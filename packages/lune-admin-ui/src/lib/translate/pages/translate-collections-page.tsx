import { useParams } from 'react-router';

import { useGetCollectionForTranslation } from '@/lib/collections/hooks/use-get-product-for-translation';

import { CollectionTranslateList } from '../components/collection-form/list/collection-translate-list';
import { TranslateCollectionForm } from '../components/collection-form/translate-collection-form';
import { TranslateHeader } from '../components/header/translate-header';

export const TranslateCollectionsPage = () => {
  const { id } = useParams() as TranslatePageParams;

  const { collection } = useGetCollectionForTranslation(id);

  return (
    <div className="bg-sidebar min-h-screen flex p-4">
      <div className="bg-background rounded-xl overflow-hidden w-full">
        <TranslateHeader />
        <main className="flex h-full">
          <CollectionTranslateList />
          {collection && <TranslateCollectionForm collection={collection} />}
        </main>
      </div>
    </div>
  );
};

export type TranslatePageParams = { id: string };
