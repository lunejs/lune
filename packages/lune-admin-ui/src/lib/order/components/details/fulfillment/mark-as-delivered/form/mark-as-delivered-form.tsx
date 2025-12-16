import { Button, DialogClose, Form, FormCheckbox, FormMessage } from '@lune/ui';

import type { CommonOrderFragment } from '@/lib/api/types';

import { useMarkAsDeliveredForm } from './use-form';

export const MarkAsDeliveredForm = ({ order }: Props) => {
  const form = useMarkAsDeliveredForm(order);

  return (
    <Form {...form}>
      <form onSubmit={form.onSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">
            This will mark order #{order.code} as delivered. The customer will be notified.
          </p>
          <FormCheckbox control={form.control} name="shouldCompleteOrder" label="Complete order" />
          {form.formState.errors.root?.message && (
            <FormMessage>{form.formState.errors.root?.message}</FormMessage>
          )}
        </div>
        <div className="flex items-center justify-end gap-2">
          <DialogClose asChild>
            <Button variant="secondary" className="w-fit">
              Cancel
            </Button>
          </DialogClose>
          <Button className="w-fit" isLoading={form.isLoading}>
            Confirm
          </Button>
        </div>
      </form>
    </Form>
  );
};

type Props = {
  order: CommonOrderFragment;
};
