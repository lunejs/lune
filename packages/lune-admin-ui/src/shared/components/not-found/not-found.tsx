import { cn, Muted } from '@lunejs/ui';
import type { ComponentProps } from 'react';

export const NotFound = ({ className, ...props }: Props) => {
  return (
    <div className={cn('h-full w-full flex items-center justify-center', className)} {...props}>
      <div>
        <p className={cn('text-center text-lg font-medium tracking-tight')}>404 - Not Found</p>
        <Muted>The page you're looking for doesn't exist</Muted>
      </div>
    </div>
  );
};

type Props = Omit<ComponentProps<'div'>, 'children'>;
