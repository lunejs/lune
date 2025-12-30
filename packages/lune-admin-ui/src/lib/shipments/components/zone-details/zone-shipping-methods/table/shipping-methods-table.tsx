import { type FC } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Small,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@lunejs/ui';

import type { CommonShippingHandlersFragment, CommonZoneFragment } from '@/lib/api/types';

import { AddShippingMethodButton } from '../actions/add-shipping-method-button';
import { ZoneShippingMethodProvider } from '../zone-shipping-method-context';

import { ShippingMethodTableRow } from './shipping-method-table-row';

export const ShippingMethodsTable: FC<Props> = ({ zone, handlers }) => {
  return (
    <ZoneShippingMethodProvider zone={zone} handlers={handlers}>
      <Card>
        <CardHeader className="flex justify-between flex-row items-center">
          <CardTitle>Shipping methods</CardTitle>

          <AddShippingMethodButton />
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Method</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!zone.shippingMethods.length && (
                <TableRow>
                  <TableCell colSpan={4}>
                    <div className="flex justify-center py-8 w-full">
                      <Small className="text-muted-foreground">No results</Small>
                    </div>
                  </TableCell>
                </TableRow>
              )}
              {zone.shippingMethods.map(method => (
                <ShippingMethodTableRow key={method.id} method={method} />
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </ZoneShippingMethodProvider>
  );
};

type Props = {
  zone: CommonZoneFragment;
  handlers: CommonShippingHandlersFragment[];
};
