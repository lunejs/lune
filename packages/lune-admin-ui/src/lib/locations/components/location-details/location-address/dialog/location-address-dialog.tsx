import { useState } from 'react';

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@lune/ui';

import { LocationSubmitButton } from '../../use-form/submit-button';
import { LocationAddressForm } from '../form/location-address-form';

import { LocationAddressSummary } from './location-address-summary';

export const LocationAddressDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog isOpen={isOpen} setIsOpen={setIsOpen}>
      <DialogTrigger asChild>
        <LocationAddressSummary />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Location address</DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-4" onSubmit={e => e.preventDefault()}>
          <LocationAddressForm />
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <LocationSubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
