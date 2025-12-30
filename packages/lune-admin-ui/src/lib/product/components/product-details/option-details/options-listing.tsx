import { CircleFadingPlusIcon } from 'lucide-react';

import { Button } from '@lunejs/ui';

import { OptionPresetSelector } from '../variants/option-preset-selector/option-preset-selector';
import { MAX_OPTIONS_ALLOWED, useVariantContext } from '../variants/variants.context';

import { OptionDetails } from './option-details';

export const OptionsListing = () => {
  const { options } = useVariantContext();

  if (!options.length) {
    return null;
  }

  return (
    <div className="border rounded-md divide-y">
      {options.map(option => (
        <OptionDetails key={option.id} option={option} />
      ))}
      {options.length < MAX_OPTIONS_ALLOWED && (
        <OptionPresetSelector>
          <div className="flex py-2 hover:bg-muted/50 rounded-b-md">
            <Button
              type="button"
              variant="link"
              className="hover:no-underline p-0 h-full w-full justify-start"
            >
              <CircleFadingPlusIcon /> Add option
            </Button>
          </div>
        </OptionPresetSelector>
      )}
    </div>
  );
};
