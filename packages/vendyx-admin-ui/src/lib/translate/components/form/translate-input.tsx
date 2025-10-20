import { type ComponentProps, useId } from 'react';

import { cn, TableCell } from '@vendyx/ui';

export const TranslateInput = ({ className, label, ...rest }: Props) => {
  const id = useId();

  return (
    <TableCell
      className={cn(
        'p-0 w-1/3 [&:has(input:focus-visible)]:ring-primary/50 [&:has(input:focus-visible)]:ring-[1px]',
        label && 'flex flex-col gap-1 w-full lg:table-cell',
        className
      )}
    >
      {label && (
        <label className="ml-4 mt-4 text-muted-foreground lg:hidden" htmlFor={id}>
          {label}
        </label>
      )}
      <input id={id} type="text" className="w-full p-4 outline-none" {...rest} />
    </TableCell>
  );
};

type Props = ComponentProps<'input'> & {
  label?: string;
};
