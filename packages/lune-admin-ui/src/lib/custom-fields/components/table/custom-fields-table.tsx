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
import { CircleFadingPlusIcon } from 'lucide-react';
import { Link } from 'react-router';

import type { CustomFieldAppliesToEntity } from '@/lib/api/types';
import { type CommonCustomFieldDefinitionFragment } from '@/lib/api/types';

import { getCustomFieldTypeData } from '../../utils/custom-field.utils';

export const CustomFieldsTable = ({ entity, customFields }: Props) => {
  return (
    <Card>
      <CardHeader className="flex justify-between flex-row items-center">
        <div>
          <CardTitle>Custom fields</CardTitle>
        </div>
        <div>
          <Link to={`/settings/custom-fields/${entity}/new`}>
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
                    <Small className="text-muted-foreground">No results</Small>
                  </div>
                </TableCell>
              </TableRow>
            )}
            {customFields.map(cf => {
              const type = getCustomFieldTypeData(cf.type);

              return (
                <TableRow key={cf.id}>
                  <TableCell>
                    <Link
                      to={`/settings/custom-fields/${entity}/${cf.id}`}
                      className="hover:underline"
                    >
                      <span>{cf.name}</span>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {<type.icon size={16} />} {type.title}
                    </div>
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
  entity: CustomFieldAppliesToEntity;
  customFields: CommonCustomFieldDefinitionFragment[];
};
