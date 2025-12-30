import { cn } from '@lunejs/ui';
import { Loader2Icon } from 'lucide-react';

export const PageLoader = ({ className }: Props) => {
  return (
    <div className={cn('w-full flex items-center justify-center h-full', className)}>
      <Loader2Icon size={24} className="animate-spin text-muted-foreground" />
    </div>
  );
};

type Props = {
  className?: string;
};
