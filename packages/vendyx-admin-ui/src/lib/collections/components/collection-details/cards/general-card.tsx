import { Card, CardContent, CardHeader, CardTitle, FormInput, FormTextarea } from '@vendyx/ui';

import { CollectionAssetUploader } from '../../asset-uploader/asset-uploader';
import { useCollectionDetailsFormContext } from '../use-form/use-form';

export const CollectionGeneralCard = () => {
  const form = useCollectionDetailsFormContext();

  return (
    <Card>
      <CardHeader>
        <CardTitle>General</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <FormInput control={form.control} name="name" label="Name" placeholder="Electronics" />
        <FormTextarea control={form.control} name="description" label="Description" />
        <CollectionAssetUploader collection={form.collection} />
      </CardContent>
    </Card>
  );
};
