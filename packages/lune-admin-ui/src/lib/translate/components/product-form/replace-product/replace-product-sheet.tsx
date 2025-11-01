import { ReplaceIcon } from 'lucide-react';

import { Button, Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@lune/ui';

import { ProductTranslateList } from '../list/product-translate-list';

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
        <ProductTranslateList
          className={{ root: 'w-full', list: 'h-[calc(100vh-69px-56px)] overflow-auto' }}
        />
      </SheetContent>
    </Sheet>
  );
};
