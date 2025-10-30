import { ListFilterIcon } from 'lucide-react';

import { Button, Input } from '@lune/ui';

export const TranslateListToolbar = () => {
  return (
    <header className="flex items-center gap-3 p-4">
      <Input placeholder="Search products..." />
      <Button variant={'outline'}>
        <ListFilterIcon />
      </Button>
    </header>
  );
};
