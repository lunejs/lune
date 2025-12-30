import type { ComponentProps } from 'react';

import { cn, H1 } from '@lunejs/ui';

export const Root = ({ className, ...props }: ComponentProps<'div'>) => {
  return <div className={cn('flex flex-col gap-6', className)} {...props} />;
};

export const Header = ({ className, ...props }: ComponentProps<'header'>) => {
  return <header className={cn('flex items-center justify-between', className)} {...props} />;
};

export const Title = ({ className, ...props }: ComponentProps<'h1'>) => {
  return <H1 className={cn('font-bold text-2xl text-left', className)} {...props} />;
};

export const Actions = ({ className, ...props }: ComponentProps<'div'>) => {
  return <div className={cn('flex items-center gap-2', className)} {...props} />;
};

export const Content = ({ className, ...props }: ComponentProps<'main'>) => {
  return <main className={cn('flex flex-col gap-6 lg:grid grid-cols-6', className)} {...props} />;
};

export const DetailsPageLayout = Object.assign(Root, {
  Header,
  Title,
  Actions,
  Content
});
