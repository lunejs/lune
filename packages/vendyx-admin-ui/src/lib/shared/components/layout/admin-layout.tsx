import { Outlet } from 'react-router';

import { SidebarInset, SidebarProvider } from '../sidebar';

import { AppSidebar } from './app-sidebar';
import { SiteHeader } from './header';

export const AdminLayout = () => {
  return (
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
          {/* <div className={cn('p-4 lg:p-6 h-full', className)}>{children}</div> */}
          <Outlet />
        </SidebarInset>
      </>
    </SidebarProvider>
  );
};
