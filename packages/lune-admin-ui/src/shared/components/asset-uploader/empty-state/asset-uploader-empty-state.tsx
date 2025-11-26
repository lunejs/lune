import { useId } from 'react';
import { ImageIcon, UploadIcon } from 'lucide-react';

import { Button, Label, Muted, Small } from '@lune/ui';

export const AssetUploaderEmptyState = ({ inputProps, rootProps }: Props) => {
  const inputId = useId();

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={inputId}>Assets</Label>
      <div
        className="w-full h-full flex flex-col items-center gap-[10px] rounded-md border-dashed border py-6"
        {...rootProps}
      >
        <Button variant="outline" className="rounded-full w-9 h-9" type="button">
          <ImageIcon />
        </Button>
        <Small className="text-base leading-[100%]">Drop your images</Small>
        <Muted>SVG, PNG, JPG or GIF (max. 5MB)</Muted>
        <Button variant="outline" type="button">
          <UploadIcon /> Select images
        </Button>
        <input id={inputId} className="hidden" type="file" {...inputProps} />
      </div>
    </div>
  );
};

type Props = {
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  rootProps: React.HTMLAttributes<HTMLDivElement>;
};
