import { ReplaceIcon } from 'lucide-react';

import { Button, Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@lune/ui';

import { TranslateList } from '../../list/translate-list';

export const ReplaceProductSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="w-full sm:w-auto lg:hidden" variant={'outline'}>
          <ReplaceIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className="gap-0 w-screen">
        <SheetHeader>
          <SheetTitle>Select product</SheetTitle>
        </SheetHeader>
        <TranslateList className="w-full" />
      </SheetContent>
    </Sheet>
  );
};
