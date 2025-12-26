import { useParams } from 'react-router';

import { P } from '@lune/ui';

import { useGetCustomObjectDefinition } from '@/lib/custom-object-definition/hooks/use-get-custom-object-definition';
import { useGetCustomObjectEntryForTranslation } from '@/lib/custom-object-entry/hooks/use-get-custom-object-entry-for-translation';
import { PageLoader } from '@/shared/components/loader/page-loader';
import { NotFound } from '@/shared/components/not-found/not-found';

import { CustomObjectTranslateList } from '../components/custom-object-form/list/custom-object-translate-list';
import { TranslateCustomObjectEntryForm } from '../components/custom-object-form/translate-collection-form';
import { TranslateHeader } from '../components/header/translate-header';

export const TranslateCustomObjectsPage = () => {
  const { definitionId, entryId } = useParams() as { definitionId: string; entryId: string };

  const definitionResponse = useGetCustomObjectDefinition(definitionId);
  const entryResponse = useGetCustomObjectEntryForTranslation(entryId);

  const { customObjectDefinition } = definitionResponse;
  const { customObjectEntry } = entryResponse;

  if (definitionResponse.isLoading || entryResponse.isLoading) return <PageLoader />;

  if (!customObjectDefinition || !customObjectEntry) return <NotFound />;

  return (
    <div className="bg-sidebar min-h-screen flex p-4">
      <div className="bg-background rounded-xl overflow-hidden w-full">
        <TranslateHeader entitySelectorTitle="" />
        <main className="flex h-full">
          <CustomObjectTranslateList
            definition={customObjectDefinition}
            className={{
              root: 'hidden lg:flex',
              list: 'h-[calc(100vh-69px-69px-32px)] overflow-y-auto'
            }}
          />
          {customObjectEntry ? (
            <TranslateCustomObjectEntryForm
              definition={customObjectDefinition}
              entry={customObjectEntry}
            />
          ) : (
            <div className="w-full border-l flex items-center justify-center">
              <P className="text-muted-foreground">Select an entry to start translating</P>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export type TranslatePageParams = { id: string };
