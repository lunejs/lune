import { Button, Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@lunejs/ui';
import { ReplaceIcon } from 'lucide-react';

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
        <CollectionTranslateList className={{ root: 'w-full flex!' }} />
      </SheetContent>
    </Sheet>
  );
};
