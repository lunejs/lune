import { Card, CardContent, CardHeader, CardTitle, FormInput, FormTextarea } from '@lune/ui';

import { ProductAssetUploader } from '../../asset-uploader/product-asset-uploader';
import { useProductDetailsFormContext } from '../use-form/use-product-details-form';

export const GeneralProductCard = () => {
  const { product, ...form } = useProductDetailsFormContext();

  return (
    <Card>
      <CardHeader>
        <CardTitle>General</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <FormInput control={form.control} name="name" label="Name" placeholder="T-Shirt" />
        <FormTextarea control={form.control} name="description" label="Description" />
        <ProductAssetUploader product={product} />
      </CardContent>
    </Card>
  );
};
