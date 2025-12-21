import { CircleFadingPlusIcon } from 'lucide-react';
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

import { type CommonCustomFieldDefinitionFragment } from '@/lib/api/types';

export const CustomFieldsTable = ({ customFields }: Props) => {
  return (
    <Card>
      <CardHeader className="flex justify-between flex-row items-center">
        <div>
          <CardTitle>Custom fields</CardTitle>
          <CardDescription>Product custom fields</CardDescription>
        </div>
        <div>
          <Link to="/settings/shipments/new">
            <Button variant="outline" size="sm" className="gap-2">
              <CircleFadingPlusIcon size={16} />
              Add definition
            </Button>
          </Link>
        </div>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Definition</TableHead>
              <TableHead>Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!customFields.length && (
              <TableRow>
                <TableCell colSpan={2}>
                  <div className="flex justify-center py-8 w-full">
                    <P className="text-muted-foreground">No results</P>
                  </div>
                </TableCell>
              </TableRow>
            )}
            {customFields.map(cf => (
              <TableRow key={cf.id}>
                <TableCell>
                  <Link to={`/settings/shipments/${cf.id}`} className="hover:underline">
                    <span>{cf.name}</span>
                  </Link>
                </TableCell>
                <TableCell>{cf.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

type Props = {
  customFields: CommonCustomFieldDefinitionFragment[];
};
