import { BellIcon } from 'lucide-react';

import { Button, Separator } from '@lune/ui';

import { AppBreadcrumb } from '../app-breadcrumb';
import { SidebarTrigger } from '../sidebar/sidebar';

export function SettingsLayoutHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <AppBreadcrumb />
        <div className="ml-auto flex items-center gap-2">
          <Button size={'icon'} variant={'outline'}>
            <BellIcon />
          </Button>
        </div>
      </div>
    </header>
  );
}
