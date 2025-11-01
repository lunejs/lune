import { ReplaceIcon } from 'lucide-react';

import { Button, Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@lune/ui';

import { CollectionTranslateList } from '../list/collection-translate-list';

export const ReplaceCollectionSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="w-full sm:w-auto lg:hidden" variant={'outline'}>
          <ReplaceIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className="gap-0 w-screen">
        <SheetHeader>
          <SheetTitle>Select collection</SheetTitle>
        </SheetHeader>
        <CollectionTranslateList className="w-full flex!" />
      </SheetContent>
    </Sheet>
  );
};
