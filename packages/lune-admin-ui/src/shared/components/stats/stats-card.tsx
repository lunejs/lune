import type { FC, ReactNode } from 'react';

import { isFirst } from '@lunejs/common';
import { Card, CardContent, cn, Muted, P } from '@lunejs/ui';

export const StatsCard: FC<Props> = ({ stats, className }) => {
  return (
    <Card className={cn('py-0', className)}>
      <CardContent>
        <div className="flex divide-x items-center">
          {stats.map((stat, i) => (
            <div
              key={stat.title + stat.value}
              className={cn('w-full flex flex-col py-4', !isFirst(i) && 'pl-6')}
            >
              <Muted>{stat.title}</Muted>
              <P>{stat.value}</P>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

type Props = {
  stats: { title: string; value: ReactNode }[];
  className?: string;
};
