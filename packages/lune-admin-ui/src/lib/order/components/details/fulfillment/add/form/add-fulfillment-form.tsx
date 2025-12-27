import { Button, DialogClose, Form, FormInput, FormMessage } from '@lune/ui';

import type { CommonOrderFragment } from '@/lib/api/types';

import { FulfillmentLineSelector } from './line-selector/fulfillment-line-selector';
import { useAddFulfillmentForm } from './use-form';

export const AddFulfillmentForm = ({ order }: Props) => {
  const form = useAddFulfillmentForm(order);

  return (
    <Form {...form}>
      <form onSubmit={form.onSubmit} className="flex flex-col gap-4">
        {form.rootError && (
          <div className="px-6">
            <FormMessage>{form.rootError}</FormMessage>
          </div>
        )}
        <FulfillmentLineSelector />

        <div className="flex items-start gap-4 px-4">
          <FormInput control={form.control} name="trackingCode" label="Tracking code" />
          <FormInput control={form.control} name="carrier" label="Carrier" />
        </div>

        <div className="flex justify-end gap-2 px-4 ">
          <DialogClose asChild>
            <Button variant={'secondary'} disabled={form.formState.isSubmitting}>
              Cancel
            </Button>
          </DialogClose>
          <Button variant={'default'} isLoading={form.formState.isSubmitting}>
            Saves
          </Button>
        </div>
      </form>
    </Form>
  );
};

type Props = {
  order: CommonOrderFragment;
};
