import { useState } from 'react';

import { Checkbox, cn } from '@lune/ui';

export const DropzoneItem = ({ preview, onCheckedChange }: Props) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="relative group rounded-md overflow-hidden">
      <Checkbox
        onCheckedChange={checked => {
          if (checked === 'indeterminate') return;
          setIsChecked(checked);
          onCheckedChange(checked);
        }}
        className={cn(
          'z-10 hidden group-hover:block absolute top-2 left-2 !bg-muted data-[state=checked]:!bg-primary border-input cursor-default',
          isChecked && 'block'
        )}
      />
      <img src={preview} alt="file" className="w-full object-cover aspect-square" />
      <div
        className={cn(
          'top-0 hidden group-hover:block absolute w-full h-full bg-black/50',
          isChecked && 'block'
        )}
      />
    </div>
  );
};

type Props = {
  preview: string;
  onCheckedChange: (value: boolean) => void;
};
