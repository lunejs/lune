import { Button, DialogClose, Form, FormCheckbox, FormInput, FormMessage } from '@lunejs/ui';

import type { CommonOrderFragment } from '@/lib/api/types';

import { useCancelOrderForm } from './use-form';

export const CancelOrderForm = ({ order }: Props) => {
  const form = useCancelOrderForm(order);

  return (
    <Form {...form}>
      <form onSubmit={form.onSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">
            This will cancel order #{order.code}. This action cannot be undone.
          </p>
          <FormInput
            control={form.control}
            name="reason"
            label="Reason"
            placeholder="Enter cancellation reason..."
          />
          <FormCheckbox control={form.control} name="shouldRestock" label="Restock inventory" />
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
          <Button variant="destructive" className="w-fit" isLoading={form.isLoading}>
            Cancel order
          </Button>
        </div>
      </form>
    </Form>
  );
};

type Props = {
  order: CommonOrderFragment;
};
