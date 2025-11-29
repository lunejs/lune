import { Loader2Icon } from 'lucide-react';

import { cn } from '@lune/ui';

export const SpinnerLoader = ({ size = 16, className }: Props) => {
  return (
    <Loader2Icon size={size} className={cn('animate-spin text-muted-foreground', className)} />
  );
};

type Props = {
  size?: number;
  className?: string;
};
