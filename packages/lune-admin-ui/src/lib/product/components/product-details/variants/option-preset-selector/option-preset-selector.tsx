import { CircleFadingPlusIcon } from 'lucide-react';

import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@lune/ui';

import { useGetOptionPresets } from '@/lib/option-preset/hooks/use-get-option-presets';

import { useVariantContext } from '../variants.context';

export const OptionPresetSelector = () => {
  const { optionPresets } = useGetOptionPresets();

  const { appendOption } = useVariantContext();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={'outline'} type="button">
          <CircleFadingPlusIcon /> Add options
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {optionPresets?.map(preset => (
                <CommandItem value={preset.id} onSelect={() => appendOption()}>
                  {preset.name}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem value={'custom'} onSelect={() => appendOption()}>
                <CircleFadingPlusIcon />
                Create custom
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
