import { cn } from '@/lib';

export function P({ children, className, ...props }: Props) {
  return (
    <p className={cn('leading-7', className)} {...props}>
      {children}
    </p>
  );
}

type Props = React.ComponentProps<'p'>;
