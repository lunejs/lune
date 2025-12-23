import { UTCDate } from '@date-fns/utc';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import type { Metric } from '@/lib/api/types';

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '../chart/chart';

export const MetricChart = ({ config, data }: Props) => {
  return (
    <ChartContainer config={config} className="aspect-auto h-[250px] w-full">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="fillValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-value)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="var(--color-value)" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="key"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={32}
          tickFormatter={value => {
            const date = new UTCDate(value);
            return date.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric'
            });
          }}
        />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              labelFormatter={value => {
                return new UTCDate(value).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                });
              }}
              indicator="dot"
            />
          }
        />
        <Area dataKey="value" type="bump" fill="url(#fillValue)" stroke="var(--color-value)" />
      </AreaChart>
    </ChartContainer>
  );
};

type Props = {
  config: ChartConfig;
  data: Metric[];
};
