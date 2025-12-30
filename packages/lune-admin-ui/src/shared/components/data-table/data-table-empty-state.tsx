import { Button, H4, Small } from '@lunejs/ui';
import type { FC, ReactElement } from 'react';

export const DataTableEmptyState: FC<Props> = ({ title, subtitle, icon, actions }) => {
  return (
    <div className="h-full w-full border border-dashed rounded-md flex items-center justify-center flex-col gap-6">
      <Button size="icon" variant="outline">
        {icon}
      </Button>
      <div className="flex flex-col gap-2 items-center">
        <H4>{title}</H4>
        <Small className="text-muted-foreground">{subtitle}</Small>
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </div>
  );
};

type Props = {
  icon: ReactElement;
  title: string;
  subtitle: string;
  actions?: ReactElement;
};
