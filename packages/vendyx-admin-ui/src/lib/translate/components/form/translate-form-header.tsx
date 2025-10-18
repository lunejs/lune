import { TableHead, TableHeader, TableRow } from '@vendyx/ui';

export const TranslateFormHeader = () => {
  return (
    <TableHeader className="bg-input/30 border-t">
      <TableRow>
        <TableHead className="px-4!">Field</TableHead>
        <TableHead className="px-4!">Reference</TableHead>
        <TableHead className="px-4!">English</TableHead>
      </TableRow>
    </TableHeader>
  );
};
