import { Form, H1 } from '@vendyx/ui';

import { type CommonCollectionFragment } from '@/lib/api/types';

import { CollectionContentTypeCard } from './cards/content-type-card';
import { CollectionGeneralCard } from './cards/general-card';
import { CollectionStatusCard } from './cards/status-card';
import { useCollectionDetailsForm } from './use-form/use-form';
import { CollectionDetailsSubmitButton } from './submit-button';

export const CollectionDetails = ({ collection }: Props) => {
  const form = useCollectionDetailsForm(collection);

  return (
    <Form {...form}>
      <form onSubmit={form.onSubmit} className="flex flex-col gap-6">
        <header className="flex items-center justify-between">
          <H1 className="font-bold text-2xl text-left">
            {collection ? collection.name : 'Add collection'}
          </H1>
          <div className="flex items-center gap-2">
            {/* {product && <ProductActions product={product} />} */}
            <CollectionDetailsSubmitButton />
          </div>
        </header>
        <main className="flex flex-col gap-6 lg:grid grid-cols-6">
          <div className="col-span-4 flex flex-col gap-6">
            <CollectionGeneralCard />

            {!collection && <CollectionContentTypeCard />}
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
  collection?: CommonCollectionFragment | null;
};
