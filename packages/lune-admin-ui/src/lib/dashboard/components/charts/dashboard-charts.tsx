import { useState } from 'react';
import { LunePrice } from '@lunejs/common';
import { Card, CardContent, CardHeader, cn, Muted, P } from '@lunejs/ui';

import type { MetricResult } from '@/lib/api/types';

import { AvgOrderValueChart } from './avg-order-value/avg-order-value-chart';
import { NewCustomersChart } from './new-customers/new-customers-chart';
import { OrdersCountChart } from './orders-count/order-counts-chart';
import { TotalSalesChart } from './total-sales/total-sales-chart';

export const DashboardCharts = ({
  totalSales,
  ordersCount,
  newCustomers,
  avgOrderValue
}: Props) => {
  const [dashboardMetric, setDashboardMetric] = useState<DashboardMetric>(
    DashboardMetric.TotalSales
  );

  return (
    <Card className="pt-0 overflow-hidden">
      <CardHeader className="p-0">
        <div className="flex divide-x items-center border-b">
          <button
            onClick={() => setDashboardMetric(DashboardMetric.TotalSales)}
            className={cn(
              'w-full flex flex-col py-4 pl-6 text-left hover:bg-muted/50',
              dashboardMetric === DashboardMetric.TotalSales && 'bg-muted!'
            )}
          >
            <Muted>Total sales</Muted>
            <P>{LunePrice.format(totalSales.total)}</P>
          </button>
          <button
            onClick={() => setDashboardMetric(DashboardMetric.OrdersCount)}
            className={cn(
              'w-full flex flex-col py-4 pl-6 text-left hover:bg-muted/50',
              dashboardMetric === DashboardMetric.OrdersCount && 'bg-muted!'
            )}
          >
            <Muted>Orders</Muted>
            <P>{ordersCount.total}</P>
          </button>
          <button
            onClick={() => setDashboardMetric(DashboardMetric.NewCustomers)}
            className={cn(
              'w-full flex flex-col py-4 pl-6 text-left hover:bg-muted/50',
              dashboardMetric === DashboardMetric.NewCustomers && 'bg-muted!'
            )}
          >
            <Muted>New customers</Muted>
            <P>{newCustomers.total}</P>
          </button>
          <button
            onClick={() => setDashboardMetric(DashboardMetric.AvgOrderValue)}
            className={cn(
              'w-full flex flex-col py-4 pl-6 text-left hover:bg-muted/50',
              dashboardMetric === DashboardMetric.AvgOrderValue && 'bg-muted!'
            )}
          >
            <Muted>Avg order value</Muted>
            <P>{LunePrice.format(avgOrderValue.total)}</P>
          </button>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {dashboardMetric === DashboardMetric.TotalSales && (
          <TotalSalesChart totalSales={totalSales.metrics} />
        )}
        {dashboardMetric === DashboardMetric.OrdersCount && (
          <OrdersCountChart ordersCount={ordersCount.metrics} />
        )}
        {dashboardMetric === DashboardMetric.NewCustomers && (
          <NewCustomersChart newCustomers={newCustomers.metrics} />
        )}
        {dashboardMetric === DashboardMetric.AvgOrderValue && (
          <AvgOrderValueChart avgOrderValue={avgOrderValue.metrics} />
        )}
      </CardContent>
    </Card>
  );
};

enum DashboardMetric {
  TotalSales = 'total_sales',
  OrdersCount = 'orders_count',
  NewCustomers = 'new_customer',
  AvgOrderValue = 'avg_order_value'
}

type Props = {
  totalSales: MetricResult;
  ordersCount: MetricResult;
  newCustomers: MetricResult;
  avgOrderValue: MetricResult;
};
