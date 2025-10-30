import type { PropsWithChildren } from 'react';

import { cn, TableRow } from '@lune/ui';

export const TranslateFormRow = ({ children, className }: Props) => {
  return <TableRow className={cn('bg-transparent!', className)}>{children}</TableRow>;
};

type Props = PropsWithChildren & {
  className?: string;
};
