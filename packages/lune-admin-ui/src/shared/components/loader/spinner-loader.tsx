import { cn } from '@lunejs/ui';
import { Loader2Icon } from 'lucide-react';

export const SpinnerLoader = ({ size = 16, className }: Props) => {
  return (
    <Loader2Icon size={size} className={cn('animate-spin text-muted-foreground', className)} />
  );
};

type Props = {
  size?: number;
  className?: string;
};
