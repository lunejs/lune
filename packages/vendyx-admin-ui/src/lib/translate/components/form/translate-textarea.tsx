import type { ComponentProps } from 'react';

import { cn, TableCell } from '@vendyx/ui';

export const TranslateTextarea = ({ className, ...rest }: Props) => {
  return (
    <TableCell
      className={cn(
        'align-top p-0 [&:has(textarea:focus-visible)]:ring-primary/50 [&:has(textarea:focus-visible)]:ring-[1px]',
        className
      )}
    >
      <textarea className="outline-none p-4 w-full" {...rest} />
    </TableCell>
  );
};

type Props = ComponentProps<'textarea'>;
