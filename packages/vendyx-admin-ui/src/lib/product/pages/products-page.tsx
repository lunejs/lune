import { AppSidebar } from '@/lib/shared/components/layout/app-sidebar';
import { SiteHeader } from '@/lib/shared/components/layout/header';
import { SidebarInset, SidebarProvider } from '@/lib/shared/components/sidebar';

import { ProductsTable } from '../components/products-table/products-table';

export function ProductsPage() {
  return (
    <>
      <SidebarProvider
        style={
          {
            '--sidebar-width': 'calc(var(--spacing) * 72)',
            '--header-height': 'calc(var(--spacing) * 12)'
          } as React.CSSProperties
        }
      >
        <>
          <AppSidebar variant="inset" />
          <SidebarInset>
            <SiteHeader />
            <div className="p-4 lg:p-6">
              <ProductsTable />
            </div>
          </SidebarInset>
        </>
      </SidebarProvider>
    </>
  );
}
