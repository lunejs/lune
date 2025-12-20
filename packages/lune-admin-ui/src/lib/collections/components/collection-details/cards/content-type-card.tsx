import { Card, CardContent, CardHeader, CardTitle, FormRadioGroup } from '@lune/ui';

import { CollectionContentType } from '@/lib/api/types';

import { useCollectionDetailsFormContext } from '../use-form/use-form';

export const CollectionContentTypeCard = () => {
  const form = useCollectionDetailsFormContext();

  return (
    <Card>
      <CardHeader className="flex">
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
  );
};
