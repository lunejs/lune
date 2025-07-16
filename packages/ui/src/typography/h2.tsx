import { cn } from '@/lib';

export function H2({ children, className, ...props }: Props) {
  return (
    <h2
      className={cn(
        'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
        className
      )}
      {...props}
    >
      {children}
    </h2>
  );
}

type Props = React.ComponentProps<'h2'>;
