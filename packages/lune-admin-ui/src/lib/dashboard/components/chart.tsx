'use client';

import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import { LunePrice } from '@lunejs/common';

import type { MetricResult } from '@/lib/api/types';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/shared/components/chart/chart';

const chartConfig = {
  value: {
    label: 'Total sales',
    color: 'var(--chart-1)'
  }
} satisfies ChartConfig;

export function TotalSalesChart({ totalSales }: Props) {
  const chartData = totalSales.map(item => ({
    key: item.key,
    value: LunePrice.toDollar(item.value)
  }));

  return (
    <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
      <AreaChart data={chartData}>
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
            const date = new Date(value);
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
                return new Date(value).toLocaleDateString('en-US', {
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
}

type Props = {
  totalSales: MetricResult['metrics'];
};
