import { LunePrice } from '@lunejs/common';

import type { Metric } from '@/lib/api/types';
import type { ChartConfig } from '@/shared/components/chart/chart';
import { MetricChart } from '@/shared/components/metric-chart/metric-chart';

const chartConfig = {
  value: {
    label: 'Avg order value',
    color: 'var(--chart-1)'
  }
} satisfies ChartConfig;

export const AvgOrderValueChart = ({ avgOrderValue }: Props) => {
  const chartData = avgOrderValue.map(item => ({
    key: item.key,
    value: LunePrice.toDollar(item.value)
  }));

  return <MetricChart config={chartConfig} data={chartData} />;
};

type Props = {
  avgOrderValue: Metric[];
};
