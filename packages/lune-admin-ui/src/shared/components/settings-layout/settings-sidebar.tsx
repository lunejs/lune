'use client';

import * as React from 'react';
import {
  CreditCardIcon,
  GroupIcon,
  LogOutIcon,
  MapPinIcon,
  StoreIcon,
  TruckIcon,
  UngroupIcon,
  UsersIcon
} from 'lucide-react';
import { Link, useLocation } from 'react-router';

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
  const location = useLocation();

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
      <SidebarContent className="fade-in">
        <SidebarGroup>
          <SidebarGroupLabel>General </SidebarGroupLabel>

          <SidebarMenu>
            {SIDEBAR.general.map(item => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  variant={item.isActive?.(location.pathname) ? 'secondary' : 'default'}
                  asChild
                >
                  <Link to={`/settings${item.url}`}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Fulfillment</SidebarGroupLabel>

          <SidebarMenu>
            {SIDEBAR.fulfillment.map(item => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  variant={item.isActive?.(location.pathname) ? 'secondary' : 'default'}
                  asChild
                >
                  <Link to={`/settings${item.url}`}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Customization</SidebarGroupLabel>

          <SidebarMenu>
            {SIDEBAR.customization.map(item => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  variant={item.isActive?.(location.pathname) ? 'secondary' : 'default'}
                  asChild
                >
                  <Link to={`/settings${item.url}`}>
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
      icon: StoreIcon,
      isActive: (pathname: string) => pathname.includes('shop')
    },
    {
      title: 'Users and permissions',
      url: '/users',
      icon: UsersIcon
    }
  ],
  fulfillment: [
    {
      title: 'Payments',
      url: '/payments',
      icon: CreditCardIcon,
      isActive: (pathname: string) => pathname.includes('payments')
    },
    {
      title: 'Shipments',
      url: '/shipments',
      icon: TruckIcon,
      isActive: (pathname: string) => pathname.includes('shipments')
    },
    {
      title: 'Locations',
      url: '/locations',
      icon: MapPinIcon,
      isActive: (pathname: string) => pathname.includes('location')
    }
  ],
  customization: [
    {
      title: 'Custom fields',
      url: '/custom-fields',
      icon: UngroupIcon,
      isActive: (pathname: string) => pathname.includes('custom-fields')
    },
    {
      title: 'Custom objects',
      url: '/custom-objects',
      icon: GroupIcon,
      isActive: (pathname: string) => pathname.includes('custom-objects')
    }
  ]
};
