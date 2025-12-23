import { LunePrice } from '@lune/common';

import type { Metric } from '@/lib/api/types';
import type { ChartConfig } from '@/shared/components/chart/chart';
import { MetricChart } from '@/shared/components/metric-chart/metric-chart';

const chartConfig = {
  value: {
    label: 'Total sales',
    color: 'var(--chart-1)'
  }
} satisfies ChartConfig;

export const TotalSalesChart = ({ totalSales }: Props) => {
  const chartData = totalSales.map(item => ({
    key: item.key,
    value: LunePrice.toDollar(item.value)
  }));

  return <MetricChart config={chartConfig} data={chartData} />;
};

type Props = {
  totalSales: Metric[];
};
