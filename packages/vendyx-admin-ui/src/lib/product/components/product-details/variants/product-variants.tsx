import { Card, CardContent, CardHeader, CardTitle } from '@vendyx/ui';

import { OptionsListing } from '../option-details/options-listing';

import { VariantsListing } from './variant-listing/variants-listing';

export const ProductVariants = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Variant</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col p-0">
        <div className="px-6 pb-4">
          <OptionsListing />
        </div>
        <VariantsListing />
      </CardContent>
    </Card>
  );
};
