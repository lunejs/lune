import { useParams } from 'react-router';

import { P } from '@lune/ui';

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
          {collection ? (
            <TranslateCollectionForm collection={collection} />
          ) : (
            <div className="w-full border-l flex items-center justify-center">
              <P className="text-muted-foreground">Select a collection to start translating</P>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export type TranslatePageParams = { id: string };
