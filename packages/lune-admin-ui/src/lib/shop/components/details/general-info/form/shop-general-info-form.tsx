import { Button, Form, FormInput, FormMessage, FormPhoneInput } from '@lune/ui';

import type { CommonShopFragment } from '@/lib/api/types';

import { useShopGeneralInfoForm } from './use-form';

export const ShopGeneralInfoForm = ({ shop }: Props) => {
  const form = useShopGeneralInfoForm(shop);

  return (
    <Form {...form}>
      <form onSubmit={form.onSubmit} className="flex flex-col gap-4">
        {form.rootError && <FormMessage>{form.rootError}</FormMessage>}

        <FormInput control={form.control} name="name" label="Shop name" />
        <FormInput control={form.control} name="email" label="Contact email" />
        <FormPhoneInput control={form.control} name="phoneNumber" label="Phone number" />
        <Button className="w-fit self-end" isLoading={form.formState.isSubmitting}>
          Save
        </Button>
      </form>
    </Form>
  );
};

type Props = {
  shop: CommonShopFragment;
};
