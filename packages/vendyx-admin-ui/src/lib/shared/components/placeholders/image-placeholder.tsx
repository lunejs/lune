import { type FC } from 'react';

import { cn } from '@vendyx/ui';

export const ImagePlaceholder: FC<Props> = ({ initial, className }) => {
  return (
    <div
      className={cn('h-12 w-12 bg-muted/50 rounded-md flex justify-center items-center', className)}
    >
      <span>{initial.charAt(0).toUpperCase()}</span>
    </div>
  );
};

type Props = {
  initial: string;
  className?: string;
};
