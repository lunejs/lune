import { Button, DialogClose, Form, FormInput, FormMessage } from '@lune/ui';

import type { CommonOrderFragment } from '@/lib/api/types';

import { useMarkAsShippedForm } from './use-form';

export const MarkAsShippedForm = ({ order }: Props) => {
  const form = useMarkAsShippedForm(order);

  return (
    <Form {...form}>
      <form onSubmit={form.onSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <FormInput control={form.control} name="trackingCode" label="Tracking code" />
          <FormInput control={form.control} name="carrier" label="Carrier" placeholder="FedEx" />
          {form.formState.errors.root?.message && (
            <FormMessage>{form.formState.errors.root?.message}</FormMessage>
          )}
        </div>
        <div className="flex items-center justify-end gap-2">
          <DialogClose asChild>
            <Button variant={'secondary'} className="w-fit">
              Cancel
            </Button>
          </DialogClose>
          <Button className="w-fit">Save</Button>
        </div>
      </form>
    </Form>
  );
};

type Props = {
  order: CommonOrderFragment;
};
