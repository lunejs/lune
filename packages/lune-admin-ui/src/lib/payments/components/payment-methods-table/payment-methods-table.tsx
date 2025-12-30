import { CircleFadingPlusIcon } from 'lucide-react';
import { Link } from 'react-router';

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Muted,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@lunejs/ui';

import type { CommonPaymentMethodFragment } from '@/lib/api/types';

export const PaymentMethodsTable = ({ paymentMethods }: Props) => {
  return (
    <Card>
      <CardHeader className="flex justify-between flex-row items-center">
        <div>
          <CardTitle>Payment methods</CardTitle>
          <CardDescription>Configure payment methods for your store</CardDescription>
        </div>
        <div>
          <Link to="/settings/payments/new">
            <Button variant="outline" size="sm" className="gap-2">
              <CircleFadingPlusIcon size={16} />
              Add payment method
            </Button>
          </Link>
        </div>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!paymentMethods.length && (
              <TableRow>
                <TableCell colSpan={2}>
                  <div className="flex justify-center py-8 w-full">
                    <Muted>No results</Muted>
                  </div>
                </TableCell>
              </TableRow>
            )}
            {paymentMethods.map(method => (
              <TableRow key={method.id}>
                <TableCell>
                  <Link to={`/settings/payments/${method.id}`} className="hover:underline">
                    <span>{method.name}</span>
                  </Link>
                </TableCell>
                <TableCell>
                  <Badge variant={method.enabled ? 'default' : 'secondary'}>
                    {method.enabled ? 'Enabled' : 'Disabled'}
                  </Badge>
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
  paymentMethods: CommonPaymentMethodFragment[];
};
