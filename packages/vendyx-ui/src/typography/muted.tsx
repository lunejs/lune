import { cn } from '@/lib';

// text sm
export function Muted({ children, className, ...props }: Props) {
  return (
    <p className={cn('text-muted-foreground text-sm', className)} {...props}>
      {children}
    </p>
  );
}

type Props = React.ComponentProps<'p'>;
