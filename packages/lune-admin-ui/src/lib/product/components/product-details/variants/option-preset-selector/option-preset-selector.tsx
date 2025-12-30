import { type ReactNode, useState } from 'react';
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
} from '@lunejs/ui';
import { CircleFadingPlusIcon } from 'lucide-react';

import { useVariantContext } from '../variants.context';

export const OptionPresetSelector = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { customObjects, appendOption } = useVariantContext();

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {customObjects?.map(customObject => (
                <CommandItem
                  key={customObject.id}
                  value={customObject.id}
                  onSelect={() => {
                    appendOption(customObject.id);
                    setIsOpen(false);
                  }}
                >
                  {customObject.name}
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
