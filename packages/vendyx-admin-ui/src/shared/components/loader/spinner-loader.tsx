import { LoaderIcon } from 'lucide-react';

import { cn } from '@vendyx/ui';

export const SpinnerLoader = ({ size = 16, className }: Props) => {
  return <LoaderIcon size={size} className={cn('animate-spin text-muted-foreground', className)} />;
};

type Props = {
  size?: number;
  className?: string;
};
