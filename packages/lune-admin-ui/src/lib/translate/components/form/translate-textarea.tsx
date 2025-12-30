import { type ComponentProps, useId } from 'react';
import { cn, TableCell } from '@lunejs/ui';

export const TranslateTextarea = ({ className, label, ...rest }: Props) => {
  const id = useId();

  return (
    <TableCell
      onClick={() => {
        document.getElementById(id)?.focus();
      }}
      className={cn(
        'cursor-text align-top h-full p-0 [&:has(textarea:focus-visible)]:ring-primary/50 [&:has(textarea:focus-visible)]:ring-[1px]',
        label && 'flex flex-col gap-1 w-full lg:table-cell',
        className
      )}
    >
      {label && (
        <label className="pl-4 pt-4 text-muted-foreground lg:hidden" htmlFor={id}>
          {label}
        </label>
      )}
      <textarea id={id} className="outline-none p-4 w-full" {...rest} />
    </TableCell>
  );
};

type Props = ComponentProps<'textarea'> & {
  label?: string;
};
