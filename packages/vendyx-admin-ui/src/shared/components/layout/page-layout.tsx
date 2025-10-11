import type { ReactNode } from 'react';

import { cn } from '@vendyx/ui';

export const PageLayout = ({ children, className }: Props) => {
  return <div className={cn('p-4 lg:p-6 h-full', className)}>{children}</div>;
};

type Props = {
  children: ReactNode;
  className?: string;
};
