import { type FC } from 'react';
import { CircleFadingPlusIcon, XIcon } from 'lucide-react';

import {
  Badge,
  Button,
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

import type { CommonZoneFragment } from '@/lib/api/types';
import { formatShippingMethodPreviewPrice } from '@/lib/shipments/utils/shipment.utils';

export const ShippingMethodsTable: FC<Props> = ({ shippingMethods }) => {
  return (
    <Card>
      <CardHeader className="flex justify-between flex-row items-center">
        <CardTitle>Shipping methods</CardTitle>

        <Button variant={'outline'} type="button">
          <CircleFadingPlusIcon /> Add Shipping methods
        </Button>
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
            {!shippingMethods.length && (
              <TableRow>
                <TableCell colSpan={4}>
                  <div className="flex justify-center py-8 w-full">
                    <P className="text-muted-foreground">No results</P>
                  </div>
                </TableCell>
              </TableRow>
            )}
            {shippingMethods.map(method => (
              <TableRow key={method.id}>
                <TableCell>{method.name}</TableCell>
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
  shippingMethods: CommonZoneFragment['shippingMethods'];
};
