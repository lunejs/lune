import { Form, H1 } from '@lunejs/ui';

import {
  CollectionContentType,
  type CommonCollectionFragment,
  type CommonCustomFieldDefinitionFragment
} from '@/lib/api/types';

import { CollectionProductsCard } from '../collection-products/collection-products';
import { CollectionSubCollectionsCard } from '../sub-collections/collection-sub-collections';

import { CollectionActions } from './actions/collection-actions';
import { CollectionContentTypeCard } from './cards/content-type-card';
import { CollectionGeneralCard } from './cards/general-card';
import { CollectionStatusCard } from './cards/status-card';
import { CollectionCustomFields } from './custom-fields/collection-custom-fields';
import { useCollectionDetailsForm } from './use-form/use-form';
import { CollectionDetailsSubmitButton } from './submit-button';

export const CollectionDetails = ({ customFieldDefinitions, collection }: Props) => {
  const form = useCollectionDetailsForm(collection);

  return (
    <Form {...form}>
      <form onSubmit={form.onSubmit} className="flex flex-col gap-6">
        <header className="flex items-center justify-between">
          <H1 className="font-bold text-2xl text-left">
            {collection ? collection.name : 'Add collection'}
          </H1>
          <div className="flex items-center gap-2">
            {collection && <CollectionActions collection={collection} />}
            <CollectionDetailsSubmitButton />
          </div>
        </header>
        <main className="flex flex-col gap-6 lg:grid grid-cols-6">
          <div className="col-span-4 flex flex-col gap-6">
            <CollectionGeneralCard />

            {!collection && <CollectionContentTypeCard />}

            {collection?.contentType === CollectionContentType.Products && (
              <CollectionProductsCard collection={collection} />
            )}

            {collection?.contentType === CollectionContentType.Collections && (
              <CollectionSubCollectionsCard collection={collection} />
            )}

            {!!customFieldDefinitions.length && (
              <CollectionCustomFields
                collection={collection}
                customFieldDefinitions={customFieldDefinitions}
              />
            )}
          </div>
          <div className="col-span-2 flex flex-col gap-6 w-full">
            <CollectionStatusCard />
          </div>
        </main>
      </form>
    </Form>
  );
};

type Props = {
  customFieldDefinitions: CommonCustomFieldDefinitionFragment[];
  collection?: CommonCollectionFragment | null;
};
