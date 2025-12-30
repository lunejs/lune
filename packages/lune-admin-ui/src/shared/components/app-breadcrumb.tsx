import { isFirst, isLast } from '@lunejs/common';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  cn
} from '@lunejs/ui';
import { Fragment } from 'react/jsx-runtime';
import { Link, useLocation, useParams } from 'react-router';

import type { CustomFieldAppliesToEntity } from '@/lib/api/types';
import { getEntityName } from '@/lib/custom-fields/utils/custom-field.utils';

export const AppBreadcrumb = () => {
  const { pathname } = useLocation();
  const params = useParams();

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    ...getBreadcrumbItems(pathname, params, params.id)
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
  '/collections': [{ label: 'Collections' }],
  '/collections/new': [
    { href: '/collections', label: 'Collections' },
    { label: 'Create collection' }
  ],
  '/assets': [{ label: 'Assets' }],
  '/orders': [{ label: 'Orders' }],
  '/orders/': [{ href: '/orders', label: 'Orders' }, { label: 'Order details' }],
  '/discounts': [{ label: 'Discounts' }],
  '/discounts/new': [{ href: '/discounts', label: 'Discounts' }, { label: 'Create discount' }],
  '/customers': [{ href: '/customers', label: 'Customers' }],
  '/customers/': [{ href: '/customers', label: 'Customers' }, { label: 'Customer details' }],
  '/custom-objects': [{ label: 'Custom objects' }],

  '/settings/shop': [{ label: 'Shop settings' }],

  '/settings/shipments': [{ label: 'Shipments' }],
  '/settings/shipments/new': [
    { href: '/settings/shipments', label: 'Shipments' },
    { label: 'Add zone' }
  ],
  '/settings/shipments/in-store-pickup': [
    { href: '/settings/shipments', label: 'Shipments' },
    { label: 'In Store Pickup' }
  ],
  '/settings/payments': [{ label: 'Payments' }],
  '/settings/payments/new': [
    { href: '/settings/payments', label: 'Payments' },
    { label: 'Add payment method' }
  ],
  '/settings/locations': [{ label: 'Locations' }],
  '/settings/locations/new': [
    { href: '/settings/locations', label: 'Locations' },
    { label: 'Add location' }
  ],
  '/settings/custom-fields': [{ label: 'Custom fields' }],
  '/settings/custom-fields/new': [
    { href: '/settings/custom-fields', label: 'Custom fields' },
    { label: 'Add custom field' }
  ],
  '/settings/custom-objects': [{ label: 'Custom objects' }],
  '/settings/custom-objects/new': [
    { href: '/settings/custom-objects', label: 'Custom objects' },
    { label: 'Add custom object' }
  ]
};

type TBreadcrumbItem = {
  href?: string;
  label: string;
};

const getBreadcrumbItems = (pathname: string, params: Record<string, unknown>, id?: string) => {
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
  if (pathname === `/orders/${id}`) {
    return [{ href: '/orders', label: 'Orders' }, { label: 'Order details' }];
  }
  if (pathname === `/customers/${params.id}`) {
    return [{ href: '/customers', label: 'Customers' }, { label: 'Customers details' }];
  }
  if (pathname === `/custom-objects/${params.id}`) {
    return [{ href: '/custom-objects', label: 'Custom objects' }, { label: 'Entries' }];
  }
  if (pathname === `/custom-objects/${params.id}/${params.entryId}`) {
    return [
      { href: '/custom-objects', label: 'Custom objects' },
      { href: `/custom-objects/${params.id}`, label: 'Entries' },
      { label: 'Entry details' }
    ];
  }
  if (pathname === `/settings/shipments/${id}`) {
    return [{ href: '/settings/shipments', label: 'Shipments' }, { label: 'Zone details' }];
  }
  if (pathname === `/settings/payments/${id}`) {
    return [{ href: '/settings/payments', label: 'Payments' }, { label: 'Payment method details' }];
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
  if (pathname.includes(`/settings/custom-fields`) && params.entity) {
    return [
      { href: '/settings/custom-fields', label: 'Custom fields' },
      { label: `${getEntityName(params.entity as CustomFieldAppliesToEntity)} custom fields` }
    ];
  }
  if (pathname === `/settings/custom-objects/${id}`) {
    return [
      { href: '/settings/custom-objects', label: 'Custom objects' },
      { label: 'Custom object details' }
    ];
  }

  return BREADCRUMBS[pathname] ?? [];
};
