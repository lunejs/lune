import { cn } from '@/lib';

export function H1({ children, className, ...props }: Props) {
  return (
    <h1
      className={cn(
        'scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance',
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
}

type Props = React.ComponentProps<'h1'>;
