import { cn } from '@/lib';

export function H3({ children, className, ...props }: Props) {
  return (
    <h3
      className={cn(
        'scroll-m-20 text-2xl font-semibold tracking-tight',
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

type Props = React.ComponentProps<'h3'>;
