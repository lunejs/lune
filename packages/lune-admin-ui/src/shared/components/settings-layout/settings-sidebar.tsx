'use client';

import * as React from 'react';
import {
  CreditCardIcon,
  LogOutIcon,
  MapPinIcon,
  StoreIcon,
  TruckIcon,
  UsersIcon
} from 'lucide-react';
import { Link } from 'react-router';

import { Logo } from '../logo';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '../sidebar/sidebar';
import { SidebarUser } from '../sidebar/sidebar-user';

export function SettingsSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:p-1.5!">
              <a href="/dashboard">
                <Logo />
                <span className="text-base font-semibold">Lune</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>General </SidebarGroupLabel>

          <SidebarMenu>
            {SIDEBAR.general.map(item => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton tooltip={item.title} asChild>
                  <Link to={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link to="/dashboard">
              <SidebarMenuButton tooltip="Settings">
                <LogOutIcon className="rotate-180" />
                <span>Exit</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarUser />
      </SidebarFooter>
    </Sidebar>
  );
}

const SIDEBAR = {
  user: {
    name: 'Rogelio Samuel',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg'
  },
  general: [
    {
      title: 'Shop details',
      url: '/shop',
      icon: StoreIcon
    },
    {
      title: 'Users and permissions',
      url: '/users',
      icon: UsersIcon
    },
    {
      title: 'Payments',
      url: '/payments',
      icon: CreditCardIcon
    },
    {
      title: 'Shipments',
      url: '/shipments',
      icon: TruckIcon
    },
    {
      title: 'Locations',
      url: '/locations',
      icon: MapPinIcon
    }
  ]
};
