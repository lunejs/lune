import { LoaderIcon } from 'lucide-react';

import { cn } from '@vendyx/ui';

export const PageLoader = ({ className }: Props) => {
  return (
    <div className={cn('w-full flex items-center justify-center h-full', className)}>
      <LoaderIcon size={24} className="animate-spin text-muted-foreground" />
    </div>
  );
};

type Props = {
  className?: string;
};
