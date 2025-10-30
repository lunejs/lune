import { Outlet } from 'react-router';

import { AppSidebar } from '../sidebar/app-sidebar';
import { SidebarInset, SidebarProvider } from '../sidebar/sidebar';

import { AdminLayoutHeader } from './admin-layout-header';

export const AdminLayout = () => {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 64)',
          '--header-height': 'calc(var(--spacing) * 12)'
        } as React.CSSProperties
      }
    >
      <>
        <AppSidebar variant="inset" />
        <SidebarInset>
          <AdminLayoutHeader />
          {/* <div className={cn('p-4 lg:p-6 h-full', className)}>{children}</div> */}
          <Outlet />
        </SidebarInset>
      </>
    </SidebarProvider>
  );
};
