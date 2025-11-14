import { PlusIcon } from 'lucide-react';
import { Link } from 'react-router';

import {
  Button,
  Card,
  CardContent,
  CardDescription,
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

import { SpinnerLoader } from '@/shared/components/loader/spinner-loader';

import { useGetZones } from '../../hooks/use-get-zones';

export const ZonesTable = () => {
  const { zones, isLoading } = useGetZones();

  return (
    <Card>
      <CardHeader className="flex justify-between flex-row items-center">
        <div>
          <CardTitle>Zones</CardTitle>
          <CardDescription>Group rates by zones</CardDescription>
        </div>
        <div>
          <Link to="/settings/shipments/new">
            <Button variant="outline" size="sm" className="gap-2">
              <PlusIcon size={16} />
              Add Zone
            </Button>
          </Link>
        </div>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Zone</TableHead>
              <TableHead>Rates</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={2}>
                  <div className="w-full flex justify-center items-center py-8">
                    <SpinnerLoader />
                  </div>
                </TableCell>
              </TableRow>
            )}
            {!zones.length && !isLoading && (
              <TableRow>
                <TableCell colSpan={2}>
                  <div className="flex justify-center py-8 w-full">
                    <P className="text-muted-foreground">No results</P>
                  </div>
                </TableCell>
              </TableRow>
            )}
            {zones.map(zone => (
              <TableRow key={zone.id}>
                <TableCell>
                  <Link to={`shipments/${zone.id}`} className="hover:underline">
                    <span>{zone.name}</span>
                  </Link>
                </TableCell>
                <TableCell>{zone.shippingMethods.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
