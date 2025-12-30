import { type FC, type PropsWithChildren, type ReactElement } from 'react';
import { ChevronLeftIcon } from 'lucide-react';
import { Link } from 'react-router';

import { Button, cn } from '@lunejs/ui';

export const SettingsPageLayout: FC<Props> = ({
  title,
  subtitle,
  backUrl,
  actions,
  className,
  children
}) => {
  return (
    <div className="flex flex-col gap-6 mt-6">
      <header className="flex items-center justify-between max-w-3xl px-6 mx-auto w-full">
        <div className="flex items-center gap-4">
          {backUrl && (
            <Link to={`${backUrl}`}>
              <Button type="button" variant="ghost" size="icon" className="h-8 w-8 lg:h-9 lg:w-9">
                <ChevronLeftIcon className="h-6 w-6" />
              </Button>
            </Link>
          )}
          <div>
            <h2 className="text-lg font-medium">{title}</h2>
            <p className="text-muted-foreground text-sm font-light">{subtitle}</p>
          </div>
        </div>
        <div className="flex gap-3">{actions}</div>
      </header>
      <main className={cn('max-w-3xl px-6 mx-auto w-full', className)}>{children}</main>
    </div>
  );
};

type Props = PropsWithChildren & {
  title?: string;
  subtitle?: string;
  backUrl?: string;
  actions?: ReactElement;
  className?: string;
};
