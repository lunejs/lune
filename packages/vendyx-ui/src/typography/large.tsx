import { cn } from '@/lib';

export function Large({ children, className, ...props }: Props) {
  return (
    <div className={cn('text-lg font-semibold', className)} {...props}>
      {children}
    </div>
  );
}

type Props = React.ComponentProps<'p'>;
