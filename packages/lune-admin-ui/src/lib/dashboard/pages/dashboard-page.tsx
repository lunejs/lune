import { useEffect, useMemo, useState } from 'react';
import { UTCDate } from '@date-fns/utc';
import { endOfMonth, format, startOfMonth } from 'date-fns';
import { BookOpenIcon, CalendarRangeIcon, InboxIcon } from 'lucide-react';
import { Link } from 'react-router';

import {
  Button,
  Calendar,
  cn,
  type DateRange,
  H4,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Small
} from '@lune/ui';

import { type MetricResult, OrderState } from '@/lib/api/types';
import { OrderParamFiltersKeys } from '@/lib/order/constants/param-filters-keys';
import { useCountOrders } from '@/lib/order/hooks/use-count-orders';
import { PageLayout } from '@/shared/components/layout/page-layout';
import { PageLoader } from '@/shared/components/loader/page-loader';

import { DashboardCharts } from '../components/charts/dashboard-charts';
import { useGetTotalAvgOrderValue } from '../hooks/use-get-total-avg-order-value';
import { useGetTotalNewCustomers } from '../hooks/use-get-total-new-customers';
import { useGetTotalOrders } from '../hooks/use-get-total-orders';
import { useGetTotalSales } from '../hooks/use-get-total-sales';

export function DashboardPage() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: startOfMonth(new UTCDate()),
    to: endOfMonth(new UTCDate())
  });

  const input = useMemo(
    () => ({
      startsAt: date?.from ?? startOfMonth(new UTCDate()),
      endsAt: date?.to ?? endOfMonth(new UTCDate())
    }),
    [date]
  );

  const { totalSales, ...totalSalesRes } = useGetTotalSales(input);

  const { totalOrders, ...totalOrdersRes } = useGetTotalOrders(input);

  const { totalNewCustomers, ...totalNewCustomersRes } = useGetTotalNewCustomers(input);

  const { totalAvgOrderValue, ...totalAvgOrderValueRes } = useGetTotalAvgOrderValue(input);

  const { count } = useCountOrders({ filters: { states: [OrderState.Placed] } });

  useEffect(() => {
    totalSalesRes.refetch();
    totalOrdersRes.refetch();
    totalNewCustomersRes.refetch();
    totalAvgOrderValueRes.refetch();
  }, [date]);

  const isLoading =
    totalSalesRes.isLoading ||
    totalOrdersRes.isLoading ||
    totalNewCustomersRes.isLoading ||
    totalAvgOrderValueRes.isLoading;

  if (isLoading) return <PageLoader />;

  return (
    <>
      <PageLayout className="max-w-3xl mx-auto w-full flex flex-col gap-8">
        <header className="flex items-center justify-between">
          <H4>Welcome to Lune</H4>
          <Link to={'#'} className="flex items-center gap-1">
            <BookOpenIcon size={16} />
            <Small>Learn</Small>
          </Link>
        </header>
        <main className="flex flex-col gap-4 min-w-0">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={'outline'}
                size={'sm'}
                className={cn(
                  'min-w-52 w-fit justify-start text-left',
                  !date && 'text-muted-foreground'
                )}
              >
                <CalendarRangeIcon className="h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                    </>
                  ) : (
                    format(date.from, 'LLL dd, y')
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>

          <DashboardCharts
            totalSales={totalSales as MetricResult}
            ordersCount={totalOrders as MetricResult}
            newCustomers={totalNewCustomers as MetricResult}
            avgOrderValue={totalAvgOrderValue as MetricResult}
          />

          {!!count && (
            <div className="flex items-center gap-4">
              <div className="size-2 rounded-full bg-distinct" />
              <Link to={`/orders?${OrderParamFiltersKeys.OrderState}=${OrderState.Placed}`}>
                <Button size={'sm'} variant={'outline'}>
                  <InboxIcon /> {count === 1 ? '1 order to fulfill' : `${count} orders to fulfill`}
                </Button>
              </Link>
              {/* <Button size={'sm'} variant={'outline'}>
              <PackageIcon /> 7 product with low stock
            </Button> */}
            </div>
          )}
        </main>
      </PageLayout>
    </>
  );
}
