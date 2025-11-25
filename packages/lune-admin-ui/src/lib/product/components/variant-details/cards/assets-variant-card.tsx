import { Card, CardContent } from '@lune/ui';

import { VariantAssetUploader } from '../../asset-uploader/variant/variant-asset-uploader';
import { useVariantDetailsFormContext } from '../use-form/use-form';

export const AssetsVariantCard = () => {
  const { productId, variant } = useVariantDetailsFormContext();

  return (
    <Card>
      <CardContent className="flex flex-col gap-3">
        <VariantAssetUploader productId={productId} variant={variant} />
      </CardContent>
    </Card>
  );
};
