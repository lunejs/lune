import { cn, TableRow } from '@lunejs/ui';
import type { PropsWithChildren } from 'react';

export const TranslateFormRow = ({ children, className }: Props) => {
  return <TableRow className={cn('bg-transparent!', className)}>{children}</TableRow>;
};

type Props = PropsWithChildren & {
  className?: string;
};
