import type { ReactNode } from 'react';

import { cn } from '@lunejs/ui';

import { PageLoader } from '../loader/page-loader';

export const PageLayout = ({ children, isLoading, className }: Props) => {
  return (
    <div className={cn('p-4 lg:p-6 h-full', className)}>
      {isLoading ? <PageLoader /> : children}
    </div>
  );
};

type Props = {
  children: ReactNode;
  isLoading?: boolean;
  className?: string;
};
