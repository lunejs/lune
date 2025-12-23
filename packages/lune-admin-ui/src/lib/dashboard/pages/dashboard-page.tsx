import { useState } from 'react';
import { endOfMonth, format, startOfMonth } from 'date-fns';
import { BookOpenIcon, CalendarRangeIcon, InboxIcon, PackageIcon } from 'lucide-react';
import { Link } from 'react-router';

import { LunePrice } from '@lune/common';
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

import { PageLayout } from '@/shared/components/layout/page-layout';
import { StatsCard } from '@/shared/components/stats/stats-card';

import { ChartAreaInteractive } from '../components/chart';

export function DashboardPage() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: startOfMonth(new Date()),
    to: endOfMonth(new Date())
  });

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

          <StatsCard
            stats={[
              { title: 'Total sales', value: LunePrice.format(609440) },
              { title: 'Orders', value: 7 },
              { title: 'New customers', value: 18 },
              { title: 'Avg order value', value: LunePrice.format(125200) }
            ]}
          />

          <ChartAreaInteractive />

          <div className="flex items-center gap-4">
            <div className="size-2 rounded-full bg-distinct" />
            <Button size={'sm'} variant={'outline'}>
              <InboxIcon /> 2 orders to fulfill
            </Button>
            <Button size={'sm'} variant={'outline'}>
              <PackageIcon /> 7 product with low stock
            </Button>
          </div>
        </main>
      </PageLayout>
    </>
  );
}
