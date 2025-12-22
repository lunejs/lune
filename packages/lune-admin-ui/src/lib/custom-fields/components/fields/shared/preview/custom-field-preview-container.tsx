import type { ComponentProps } from 'react';

import { cn } from '@lune/ui';

export const CustomFieldPreviewContainer = ({ className, ...props }: Props) => {
  return (
    <div
      className={cn(
        'dark:bg-input/30 border-input h-9 min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        'relative w-full shrink-0 px-1 flex items-center gap-1 overflow-x-hidden dark:group-hover:bg-input/50 group-hover:bg-muted cursor-default',
        className
      )}
      {...props}
    />
  );
};

type Props = ComponentProps<'div'>;
