'use client';

import * as React from 'react';
import {
  BoxesIcon,
  GroupIcon,
  ImagesIcon,
  PackageIcon,
  SettingsIcon,
  ShoppingCartIcon,
  TagIcon,
  UserIcon,
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
} from './sidebar';
import { SidebarUser } from './sidebar-user';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
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
          <SidebarGroupLabel>Catalog</SidebarGroupLabel>

          <SidebarMenu>
            {SIDEBAR.navMain.map(item => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  variant={item.isActive?.(location.pathname) ? 'secondary' : 'default'}
                  tooltip={item.title}
                  asChild
                >
                  <Link to={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Sales</SidebarGroupLabel>

          <SidebarMenu>
            {SIDEBAR.sales.map(item => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  variant={item.isActive?.(location.pathname) ? 'secondary' : 'default'}
                  asChild
                >
                  <Link to={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Customers</SidebarGroupLabel>

          <SidebarMenu>
            {SIDEBAR.customers.map(item => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  variant={item.isActive(location.pathname) ? 'secondary' : 'default'}
                  asChild
                >
                  <Link to={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Content</SidebarGroupLabel>

          <SidebarMenu>
            {SIDEBAR.content.map(item => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  variant={item.isActive(location.pathname) ? 'secondary' : 'default'}
                  asChild
                >
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
            <Link to={'/settings/shop'}>
              <SidebarMenuButton tooltip="Settings">
                <SettingsIcon />
                <span>Settings</span>
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
  navMain: [
    {
      title: 'Products',
      url: '/products',
      icon: PackageIcon,
      isActive: (pathname: string) => pathname.includes('products')
    },
    {
      title: 'Collections',
      url: '/collections',
      icon: BoxesIcon,
      isActive: (pathname: string) => pathname.includes('collections')
    },
    {
      title: 'Assets',
      url: '/assets',
      icon: ImagesIcon
    }
  ],
  sales: [
    {
      title: 'Orders',
      url: '/orders',
      icon: ShoppingCartIcon,
      isActive: (pathname: string) => pathname.includes('orders')
    },
    {
      title: 'Discounts',
      url: '/discounts',
      icon: TagIcon,
      isActive: (pathname: string) => pathname.includes('discounts')
    }
  ],
  customers: [
    {
      title: 'Customers',
      url: '/customers',
      icon: UserIcon,
      isActive: (pathname: string) => pathname.includes('customers')
    },
    {
      title: 'Segments',
      url: '#',
      icon: UsersIcon,
      isActive: (pathname: string) => pathname.includes('random')
    }
  ],
  content: [
    {
      title: 'Custom objects',
      url: '/custom-objects',
      icon: GroupIcon,
      isActive: (pathname: string) => pathname.includes('custom-objects')
    }
  ]
};
