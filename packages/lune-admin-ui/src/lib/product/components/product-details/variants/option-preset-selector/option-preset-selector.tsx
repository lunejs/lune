import { type ReactNode, useState } from 'react';
import { CircleFadingPlusIcon } from 'lucide-react';

import {
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

export const OptionPresetSelector = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { optionPresets } = useGetOptionPresets();
  const { appendOption } = useVariantContext();

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {optionPresets?.map(preset => (
                <CommandItem
                  key={preset.id}
                  value={preset.id}
                  onSelect={() => {
                    appendOption(preset.id);
                    setIsOpen(false);
                  }}
                >
                  {preset.name}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem
                value={'custom'}
                onSelect={() => {
                  appendOption();
                  setIsOpen(false);
                }}
              >
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

type Props = {
  children: ReactNode;
};
