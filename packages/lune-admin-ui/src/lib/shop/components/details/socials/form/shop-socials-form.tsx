import { Button, Form, FormInput, FormMessage } from '@lune/ui';

import type { CommonShopFragment } from '@/lib/api/types';

import { useShopSocialsForm } from './use-form';

export const ShopSocialsForm = ({ shop }: Props) => {
  const form = useShopSocialsForm(shop);

  return (
    <Form {...form}>
      <form onSubmit={form.onSubmit} className="flex flex-col gap-4">
        {form.rootError && <FormMessage>{form.rootError}</FormMessage>}

        <FormInput
          control={form.control}
          name="facebook"
          label="Facebook"
          placeholder="https://facebook.com/..."
        />
        <FormInput
          control={form.control}
          name="instagram"
          label="Instagram"
          placeholder="https://instagram.com/..."
        />
        <FormInput
          control={form.control}
          name="twitter"
          label="Twitter"
          placeholder="https://twitter.com/..."
        />
        <Button
          className="w-fit self-end"
          disabled={!form.formState.isDirty}
          isLoading={form.formState.isSubmitting}
        >
          Save
        </Button>
      </form>
    </Form>
  );
};

type Props = {
  shop: CommonShopFragment;
};
