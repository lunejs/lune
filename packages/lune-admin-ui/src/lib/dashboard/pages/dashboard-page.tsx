import { H4, Small } from '@lune/ui';

import { PageLayout } from '@/shared/components/layout/page-layout';

export function DashboardPage() {
  return (
    <PageLayout className="max-w-2xl mx-auto w-full">
      <header className="flex items-center justify-between">
        <H4>Welcome to Lune</H4>
        <Small>Learn</Small>
      </header>
      {/* <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards />
            <div className="px-4 lg:px-6">
              <ChartAreaInteractive />
            </div>
            <DataTable data={data} />
          </div>
        </div>
      </div> */}
    </PageLayout>
  );
}
