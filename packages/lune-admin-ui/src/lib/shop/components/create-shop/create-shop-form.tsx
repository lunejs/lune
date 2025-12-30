import { Button, Form, FormInput, FormPhoneInput } from '@lunejs/ui';

import { useCreateShopForm } from './use-create-shop-form';

export const CreateShopForm = () => {
  const form = useCreateShopForm();

  return (
    <Form {...form}>
      <form onSubmit={form.onSubmit} className="flex flex-col gap-4">
        <FormInput control={form.control} name="name" label="Name" placeholder="E-Store" />
        <FormInput
          control={form.control}
          name="email"
          label="Email"
          placeholder="m@example.com"
          description="Email used for customers to contact you"
        />
        <FormPhoneInput label="Phone number" control={form.control} name="phoneNumber" />
        <div className="text-right">
          <Button isLoading={form.isLoading}>Create shop</Button>
        </div>
      </form>
    </Form>
  );
};
