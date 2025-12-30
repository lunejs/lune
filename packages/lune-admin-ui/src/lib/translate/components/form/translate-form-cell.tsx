import type { PropsWithChildren } from 'react';

import { cn, TableCell } from '@lunejs/ui';

export const TranslateFormCell = ({ children, isDisabled, className }: Props) => {
  return (
    <TableCell
      className={cn(
        'w-1/3 p-4 break-normal whitespace-normal',
        isDisabled && 'bg-muted',
        className
      )}
    >
      {children}
    </TableCell>
  );
};

type Props = PropsWithChildren & {
  isDisabled?: boolean;
  className?: string;
};
