import { cn } from '@/lib';

export function Small({ children, className, ...props }: Props) {
  return (
    <small
      className={cn('text-sm leading-none font-medium', className)}
      {...props}
    >
      {children}
    </small>
  );
}

type Props = React.ComponentProps<'p'>;
