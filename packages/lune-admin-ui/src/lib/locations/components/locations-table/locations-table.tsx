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
  P,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@lune/ui';

import type { CommonListLocationFragment } from '@/lib/api/types';

export const LocationsTable = ({ locations }: Props) => {
  return (
    <Card>
      <CardHeader className="flex justify-between flex-row items-center">
        <div>
          <CardTitle>Locations</CardTitle>
          <CardDescription>Locations are used to show in store pickup shipping.</CardDescription>
        </div>
        <div>
          <Link to="/settings/locations/new">
            <Button variant="outline" size="sm" className="gap-2">
              <CircleFadingPlusIcon size={16} />
              Add Location
            </Button>
          </Link>
        </div>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!locations.length && (
              <TableRow>
                <TableCell colSpan={2}>
                  <div className="flex justify-center py-8 w-full">
                    <P className="text-muted-foreground">No results</P>
                  </div>
                </TableCell>
              </TableRow>
            )}
            {locations.map(location => (
              <TableRow key={location.id}>
                <TableCell>
                  <Link
                    to={`locations/${location.id}`}
                    className="flex flex-col gap-1 w-full text-nowrap"
                  >
                    <span className="text-sm font-normal">{location.name}</span>
                    <span className="text-sm font-normal text-muted-foreground">
                      {location.streetLine1}, {location.city} {location.state.name},{' '}
                      {location.country.name}
                    </span>
                  </Link>
                </TableCell>
                <TableCell>
                  <Badge variant={location.enabled ? 'default' : 'secondary'}>
                    {location.enabled ? 'Active' : 'Inactive'}
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
  locations: CommonListLocationFragment[];
};
