import { Fragment } from 'react/jsx-runtime';
import { Link, useLocation } from 'react-router';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@vendyx/ui';

import { isLast } from '../utils/arrays.utils';

export const AppBreadcrumb = () => {
  const { pathname } = useLocation();

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    ...getBreadcrumbItems(pathname)
  ];

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems.map(({ label, href }, i) =>
          isLast(i, breadcrumbItems) ? (
            <BreadcrumbItem key={label}>
              <BreadcrumbPage>{label}</BreadcrumbPage>
            </BreadcrumbItem>
          ) : (
            <Fragment key={label}>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={`${href ?? ''}`} className="flex items-center">
                    {label}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </Fragment>
          )
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

const BREADCRUMBS: Record<string, TBreadcrumbItem[]> = {
  '/': [],
  '/products': [{ label: 'Products' }],
  '/products/': [{ href: '/products', label: 'Products' }, { label: 'Product details' }],
  '/products/new': [{ href: '/products', label: 'Products' }, { label: 'Create product' }],
  '/collections': [{ href: '/collections', label: 'Collections' }, { label: 'All collections' }],
  '/collections/': [
    { href: '/collections', label: 'Collections' },
    { label: 'Collection details' }
  ],
  '/collections/new': [
    { href: '/collections', label: 'Collections' },
    { label: 'Create collection' }
  ],
  '/orders': [{ href: '/orders', label: 'Orders' }, { label: 'All orders' }],
  '/orders/': [{ href: '/orders', label: 'Orders' }, { label: 'Order details' }],
  '/customers': [{ href: '/customers', label: 'Customers' }, { label: 'All customers' }],
  '/customers/': [{ href: '/customers', label: 'Customers' }, { label: 'Customer details' }],
  '/discounts': [{ href: '/discounts', label: 'Discounts' }, { label: 'All discounts' }],
  '/discounts/': [{ href: '/discounts', label: 'Discounts' }, { label: 'Discount details' }],
  '/discounts/new': [{ href: '/discounts', label: 'Discounts' }, { label: 'Create discount' }],
  '/wholesale': [{ href: '/wholesale', label: 'Wholesale' }, { label: 'All requests' }],
  '/wholesale/': [{ href: '/wholesale', label: 'Wholesale' }, { label: 'Request' }]
};

type TBreadcrumbItem = {
  href?: string;
  label: string;
};

const getBreadcrumbItems = (pathname: string) => {
  return BREADCRUMBS[pathname] ?? [];
};
