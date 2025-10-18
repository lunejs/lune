import type { ComponentProps } from 'react';

import { cn, TableCell } from '@vendyx/ui';

export const TranslateInput = ({ className, ...rest }: Props) => {
  return (
    <TableCell
      className={cn(
        'p-0 w-1/3 [&:has(input:focus-visible)]:ring-primary/50 [&:has(input:focus-visible)]:ring-[1px]',
        className
      )}
    >
      <input type="text" className="w-full p-4 outline-none" {...rest} />
    </TableCell>
  );
};

type Props = ComponentProps<'input'>;
