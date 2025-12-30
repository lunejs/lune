import { CircleFadingPlusIcon } from 'lucide-react';
import { Link } from 'react-router';

import {
  Button,
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

import type { CommonCustomObjectDefinitionFragment } from '@/lib/api/types';

export const CustomObjectsTable = ({ customObjects }: Props) => {
  return (
    <Card>
      <CardHeader className="flex justify-between flex-row items-center">
        <div>
          <CardTitle>Custom objects</CardTitle>
        </div>
        <div>
          <Link to={`/settings/custom-objects/new`}>
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
              <TableHead>Key</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!customObjects.length && (
              <TableRow>
                <TableCell colSpan={2}>
                  <div className="flex justify-center py-8 w-full">
                    <Small className="text-muted-foreground">No results</Small>
                  </div>
                </TableCell>
              </TableRow>
            )}
            {customObjects.map(co => {
              return (
                <TableRow key={co.id}>
                  <TableCell>
                    <Link to={`/settings/custom-objects/${co.id}`} className="hover:underline">
                      <span>{co.name}</span>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 font-mono">{co.key}</div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

type Props = {
  customObjects: CommonCustomObjectDefinitionFragment[];
};
