import { Fragment } from 'react/jsx-runtime';
import { Link, useLocation, useParams } from 'react-router';

import { isFirst, isLast } from '@lune/common';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  cn
} from '@lune/ui';

export const AppBreadcrumb = () => {
  const { pathname } = useLocation();
  const { id } = useParams();

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    ...getBreadcrumbItems(pathname, id)
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
              <BreadcrumbItem className={cn(isFirst(i) && 'hidden sm:flex')}>
                <BreadcrumbLink asChild>
                  <Link to={`${href ?? ''}`} className="flex items-center">
                    {label}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className={cn(isFirst(i) && 'hidden sm:flex')} />
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
  '/products/new': [{ href: '/products', label: 'Products' }, { label: 'Add product' }],
  '/collections': [{ href: '/collections', label: 'Collections' }, { label: 'All collections' }],
  '/collections/': [
    { href: '/collections', label: 'Collections' },
    { label: 'Collection details' }
  ],
  '/collections/new': [
    { href: '/collections', label: 'Collections' },
    { label: 'Create collection' }
  ],
  '/assets': [{ href: '/assets', label: 'Assets' }, { label: 'All assets' }],
  '/orders': [{ href: '/orders', label: 'Orders' }, { label: 'All orders' }],
  '/orders/': [{ href: '/orders', label: 'Orders' }, { label: 'Order details' }],
  '/customers': [{ href: '/customers', label: 'Customers' }, { label: 'All customers' }],
  '/customers/': [{ href: '/customers', label: 'Customers' }, { label: 'Customer details' }],
  '/discounts': [{ href: '/discounts', label: 'Discounts' }, { label: 'All discounts' }],
  '/discounts/': [{ href: '/discounts', label: 'Discounts' }, { label: 'Discount details' }],
  '/discounts/new': [{ href: '/discounts', label: 'Discounts' }, { label: 'Create discount' }],
  '/wholesale': [{ href: '/wholesale', label: 'Wholesale' }, { label: 'All requests' }],
  '/wholesale/': [{ href: '/wholesale', label: 'Wholesale' }, { label: 'Request' }],

  '/settings/shipments': [{ label: 'Shipments' }],
  '/settings/shipments/new': [
    { href: '/settings/shipments', label: 'Shipments' },
    { label: 'Add zone' }
  ],
  '/settings/shipments/in-store-pickup': [
    { href: '/settings/shipments', label: 'Shipments' },
    { label: 'In Store Pickup' }
  ],
  '/settings/locations': [{ label: 'Locations' }],
  '/settings/locations/new': [
    { href: '/settings/locations', label: 'Locations' },
    { label: 'Add location' }
  ]
};

type TBreadcrumbItem = {
  href?: string;
  label: string;
};

const getBreadcrumbItems = (pathname: string, id?: string) => {
  if (pathname === `/products/${id}`) {
    return [{ href: '/products', label: 'Products' }, { label: 'Product details' }];
  }
  if (pathname.includes(`/products/${id}/variants`)) {
    return [
      { href: '/products', label: 'Products' },
      { href: `/products/${id}`, label: 'Product details' },
      { label: 'Variants' }
    ];
  }
  if (pathname === `/collections/${id}`) {
    return [{ href: '/collections', label: 'Collections' }, { label: 'Collection details' }];
  }
  if (pathname === `/discounts/${id}`) {
    return [{ href: '/discounts', label: 'Discounts' }, { label: 'Discount details' }];
  }
  if (pathname === `/settings/shipments/${id}`) {
    return [{ href: '/settings/shipments', label: 'Shipments' }, { label: 'Zone details' }];
  }
  if (pathname === `/settings/locations/${id}`) {
    return [{ href: '/settings/locations', label: 'Locations' }, { label: 'Location details' }];
  }
  if (pathname === `/settings/shipments/in-store-pickup/${id}`) {
    return [
      { href: '/settings/shipments', label: 'Shipments' },
      { href: '/settings/shipments/in-store-pickup', label: 'In Store Pickup' },
      { label: 'Preferences' }
    ];
  }

  return BREADCRUMBS[pathname] ?? [];
};
