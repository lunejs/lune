import { type ReactElement, useState } from 'react';
import { Input, Popover, PopoverContent, PopoverTrigger } from '@lunejs/ui';
import { hsvaToHex } from '@uiw/color-convert';
import Colorful from '@uiw/react-color-colorful';

export const ColorPicker = ({ children, onChange }: Props) => {
  const [hsva, setHsva] = useState({ h: 0, s: 0, v: 68, a: 1 });

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-fit">
        <div className="flex flex-col gap-4">
          <Colorful
            className="w-full!"
            disableAlpha
            color={hsva}
            onChange={color => {
              setHsva(color.hsva);
              onChange(hsvaToHex(color.hsva));
            }}
          />
          <div className="flex items-center gap-2">
            <div
              className="h-9 w-9 shrink-0 rounded-md"
              style={{ backgroundColor: hsvaToHex(hsva) }}
            />
            <Input value={hsvaToHex(hsva)} className="" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

type Props = {
  onChange: (hex: string) => void;
  children: ReactElement;
};
