import { CircleFadingPlusIcon } from 'lucide-react';

import { Button } from '@vendyx/ui';

import { MAX_OPTIONS_ALLOWED, useVariantContext } from '../variants/variants.context';

import { OptionDetails } from './option-details';

export const OptionsListing = () => {
  const { options, appendOption } = useVariantContext();

  if (!options.length) {
    return null;
  }

  return (
    <div className="border rounded-md divide-y">
      {options.map(option => (
        <OptionDetails key={option.id} option={option} />
      ))}
      {options.length < MAX_OPTIONS_ALLOWED && (
        <div className="flex h-14 hover:bg-muted/50 rounded-b-md">
          <Button
            type="button"
            variant="link"
            className="text-distinct hover:no-underline p-0 h-full w-full"
            onClick={() => appendOption()}
          >
            <CircleFadingPlusIcon /> Add option
          </Button>
        </div>
      )}
    </div>
  );
};
