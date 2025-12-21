import type { ComponentProps } from 'react';

import { Badge, cn } from '@lune/ui';

import { ImagePlaceholder } from '@/shared/components/placeholders/image-placeholder';

export const CustomFieldEntityPreview = ({ title, image, className, ...props }: Props) => {
  return (
    <Badge variant={'secondary'} className={cn('bg-background/75 max-w-36', className)} {...props}>
      {image ? (
        <img src={image} alt={title} className="w-5 h-5 rounded shrink-0 object-cover" />
      ) : (
        <ImagePlaceholder initial={title} className="w-5 h-5 rounded shrink-0" />
      )}
      <span className="truncate">{title}</span>
    </Badge>
  );
};

type Props = ComponentProps<'span'> & {
  title: string;
  image: string | undefined;
};
