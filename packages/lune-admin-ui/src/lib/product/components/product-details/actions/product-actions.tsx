import { useState } from 'react';
import { ArchiveIcon, ChevronDownIcon, LanguagesIcon, LogOutIcon, Trash2Icon } from 'lucide-react';

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  H4,
  Small
} from '@lune/ui';

import type { CommonProductFragment } from '@/lib/api/types';
import { useBack } from '@/shared/hooks/use-back';

import { ArchiveProduct } from './archive/archive-product';
import { RemoveProduct } from './remove/remove-product';

export const ProductActions = ({ product }: Props) => {
  const { goto } = useBack();

  const [isRemoveProductOpen, setRemoveProductOpen] = useState(false);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const [isTranslateOpen, setIsTranslateOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <span className="hidden lg:inline">Actions</span> <ChevronDownIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => goto(`/translate/products/${product.id}`)}>
            <LanguagesIcon /> Translate
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsArchiveOpen(true)}>
            <ArchiveIcon /> Archive
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-destructive hover:text-destructive!"
            onClick={() => setRemoveProductOpen(true)}
          >
            <Trash2Icon className="text-destructive" /> Remove
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <RemoveProduct
        isOpen={isRemoveProductOpen}
        setIsOpen={setRemoveProductOpen}
        product={product}
      />
      <ArchiveProduct isOpen={isArchiveOpen} setIsOpen={setIsArchiveOpen} product={product} />
      <Dialog isOpen={isTranslateOpen} setIsOpen={setIsTranslateOpen}>
        <DialogContent
          className="max-w-[calc(100%-2rem)]! h-[calc(100%-2rem)]! p-0 "
          showCloseButton={false}
        >
          <DialogHeader className="rounded-t-md h-fit border-b flex flex-row items-center justify-between bg-input/30">
            <DialogClose className="flex items-center gap-4 h-full w-fit p-4 cursor-pointer rounded-tl-lg transition-colors">
              <LogOutIcon size={16} className="rotate-180" /> <Small>Quit</Small>
            </DialogClose>
            <H4>Translate</H4>
            <div className="flex items-center gap-2 mr-4">
              <Button size={'sm'} variant={'outline'}>
                Cancel
              </Button>
              <Button size={'sm'}>Save</Button>
            </div>
          </DialogHeader>
          <div>
            <h1>hiu</h1>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

type Props = {
  product: CommonProductFragment;
};
