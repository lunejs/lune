import { CircleFadingPlusIcon } from 'lucide-react';

import { Button, Card, CardAction, CardContent, CardHeader, CardTitle, cn } from '@lune/ui';

import { OptionsListing } from '../option-details/options-listing';

import { VariantsListing } from './variant-listing/variants-listing';
import { useVariantContext } from './variants.context';

export const ProductVariants = () => {
  const { options, appendOption } = useVariantContext();
  return (
    <Card className={cn('overflow-hidden', options.length && 'pb-0')}>
      <CardHeader>
        <CardTitle className="col-start-1 row-span-2 row-start-1 self-start justify-self-start h-full flex items-center">
          Variant
        </CardTitle>
        {!options.length && (
          <CardAction>
            <Button variant={'outline'} onClick={() => appendOption()} type="button">
              <CircleFadingPlusIcon /> Add options
            </Button>
          </CardAction>
        )}
      </CardHeader>
      {!!options.length && (
        <CardContent className="flex flex-col p-0">
          <div className="px-6 pb-4">
            <OptionsListing />
          </div>
          <VariantsListing />
        </CardContent>
      )}
    </Card>
  );
};
