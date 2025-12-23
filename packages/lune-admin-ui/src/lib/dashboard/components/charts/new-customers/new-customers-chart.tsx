import type { Metric } from '@/lib/api/types';
import type { ChartConfig } from '@/shared/components/chart/chart';
import { MetricChart } from '@/shared/components/metric-chart/metric-chart';

const chartConfig = {
  value: {
    label: 'New customers',
    color: 'var(--chart-1)'
  }
} satisfies ChartConfig;

export const NewCustomersChart = ({ newCustomers }: Props) => {
  return <MetricChart config={chartConfig} data={newCustomers} />;
};

type Props = {
  newCustomers: Metric[];
};
