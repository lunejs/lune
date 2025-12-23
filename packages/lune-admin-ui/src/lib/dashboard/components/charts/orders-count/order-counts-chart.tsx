import type { Metric } from '@/lib/api/types';
import type { ChartConfig } from '@/shared/components/chart/chart';
import { MetricChart } from '@/shared/components/metric-chart/metric-chart';

const chartConfig = {
  value: {
    label: 'Total sales',
    color: 'var(--chart-1)'
  }
} satisfies ChartConfig;

export const OrdersCountChart = ({ ordersCount }: Props) => {
  return <MetricChart config={chartConfig} data={ordersCount} />;
};

type Props = {
  ordersCount: Metric[];
};
