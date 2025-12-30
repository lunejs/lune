import { TableHead, TableHeader, TableRow } from '@lunejs/ui';

export const TranslateFormHeader = () => {
  return (
    <TableHeader className="hidden lg:table-header-group bg-input/30 border-t">
      <TableRow>
        <TableHead className="hidden lg:table-cell px-4!">Field</TableHead>
        <TableHead className="hidden lg:table-cell px-4!">Reference</TableHead>
        <TableHead className="hidden lg:table-cell px-4!">English</TableHead>
      </TableRow>
    </TableHeader>
  );
};
