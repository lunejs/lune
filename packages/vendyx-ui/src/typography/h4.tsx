import { cn } from '@/lib';

export function H4({ children, className, ...props }: Props) {
  return (
    <h4
      className={cn(
        'scroll-m-20 text-xl font-semibold tracking-tight',
        className
      )}
      {...props}
    >
      {children}
    </h4>
  );
}

type Props = React.ComponentProps<'h4'>;
