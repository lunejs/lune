import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Form,
  FormInput,
  FormRadioGroup,
  FormSwitch,
  FormTextarea,
  H1
} from '@vendyx/ui';

import { CollectionContentType, type CommonCollectionFragment } from '@/lib/api/types';

import { CollectionAssetUploader } from '../asset-uploader/asset-uploader';

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
            <Card>
              <CardHeader>
                <CardTitle>General</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <FormInput
                  control={form.control}
                  name="name"
                  label="Name"
                  placeholder="Electronics"
                />
                <FormTextarea control={form.control} name="description" label="Description" />
                <CollectionAssetUploader collection={collection} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Content type</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <FormRadioGroup
                  control={form.control}
                  name="contentType"
                  items={[
                    {
                      label: 'Products',
                      value: CollectionContentType.Products,
                      description: 'A normal collection containing products.'
                    },
                    {
                      label: 'Collections',
                      value: CollectionContentType.Collections,
                      description:
                        'Convert this collection into a parent collection containing sub collections.'
                    }
                  ]}
                />
              </CardContent>
            </Card>
          </div>
          <div className="col-span-2 flex flex-col gap-6 w-full">
            <Card>
              <CardHeader>
                <CardTitle>Status</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <FormSwitch control={form.control} name="enabled" label="Published" />
              </CardContent>
            </Card>
          </div>
        </main>
      </form>
    </Form>
  );
};

type Props = {
  collection?: CommonCollectionFragment | null;
};
