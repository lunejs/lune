import { Outlet } from 'react-router';

import { SidebarInset, SidebarProvider } from '../sidebar/sidebar';

import { SettingsLayoutHeader } from './setting-layout-header';
import { SettingsSidebar } from './settings-sidebar';

export const SettingsLayout = () => {
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
        <SettingsSidebar variant="inset" />
        <SidebarInset>
          <SettingsLayoutHeader />
          <Outlet />
        </SidebarInset>
      </>
    </SidebarProvider>
  );
};
