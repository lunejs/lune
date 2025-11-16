import { type FC } from 'react';
import { XIcon } from 'lucide-react';

import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  P,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@lune/ui';

import type { CommonShippingHandlersFragment, CommonZoneFragment } from '@/lib/api/types';
import { formatShippingMethodPreviewPrice } from '@/lib/shipments/utils/shipment.utils';

import { AddShippingMethodButton } from './add-shipping-method-button';
import { UpdateShippingMethodButton } from './update-shipping-method';

export const ShippingMethodsTable: FC<Props> = ({ zone, handlers }) => {
  return (
    <Card>
      <CardHeader className="flex justify-between flex-row items-center">
        <CardTitle>Shipping methods</CardTitle>

        <AddShippingMethodButton zone={zone} shippingHandlers={handlers} />
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
                    <P className="text-muted-foreground">No results</P>
                  </div>
                </TableCell>
              </TableRow>
            )}
            {zone.shippingMethods.map(method => (
              <TableRow key={method.id}>
                <TableCell>
                  <UpdateShippingMethodButton method={method} zone={zone} handlers={handlers} />
                </TableCell>
                <TableCell>{formatShippingMethodPreviewPrice(method.pricePreview)}</TableCell>
                <TableCell>
                  <Badge variant={method.enabled ? 'default' : 'secondary'}>
                    {method.enabled ? 'Active' : 'Inactive'}
                  </Badge>
                </TableCell>
                <TableCell className="w-8">
                  <button
                    type="button"
                    className="text-muted-foreground p-2 hover:bg-muted transition-colors rounded-sm cursor-pointer disabled:pointer-events-none"
                  >
                    <XIcon size={16} />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

type Props = {
  zone: CommonZoneFragment;
  handlers: CommonShippingHandlersFragment[];
};
