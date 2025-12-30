import { useState } from 'react';
import { ReplaceIcon } from 'lucide-react';

import { Button, Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@lunejs/ui';

import type { CommonVariantFragment } from '@/lib/api/types';

import { VariantsList } from '../variants-list/variants-list';

export const ReplaceVariantSheet = ({ variants: allVariants }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button className="lg:hidden" variant={'outline'}>
          <ReplaceIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className="gap-0 w-screen">
        <SheetHeader>
          <SheetTitle>Select variant</SheetTitle>
        </SheetHeader>
        <VariantsList variants={allVariants}>
          <div className="px-4">
            <VariantsList.Input placeholder="Search..." />
          </div>
          <div className="border-t max-h-[calc(100vh-56px-36px-16px)] overflow-y-auto">
            <VariantsList.List onClick={() => setIsOpen(false)} />
          </div>
        </VariantsList>
      </SheetContent>
    </Sheet>
  );
};

type Props = {
  variants: CommonVariantFragment[];
};
