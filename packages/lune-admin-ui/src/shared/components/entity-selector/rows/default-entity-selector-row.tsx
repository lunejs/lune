import { useId } from 'react';

import { Checkbox } from '@lune/ui';

import { ImagePlaceholder } from '../../placeholders/image-placeholder';

export const DefaultEntitySelectorRow = ({ title, image, isSelected, onSelect }: Props) => {
  const id = useId();

  return (
    <label htmlFor={id} className="flex items-center gap-4 py-4 px-6 hover:bg-muted cursor-pointer">
      <Checkbox id={id} checked={isSelected} onCheckedChange={onSelect} />
      {image ? (
        <img src={image} alt={title} className="w-10 h-10 object-cover rounded" />
      ) : (
        <ImagePlaceholder className="w-10 h-10" initial={title} />
      )}
      <p>{title}</p>
    </label>
  );
};

type Props = {
  title: string;
  image?: string;
  isSelected: boolean;
  onSelect: (value: boolean) => void;
};
