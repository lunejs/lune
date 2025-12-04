import { customAlphabet } from 'nanoid';

import { Button, FormInput } from '@lune/ui';

import { DiscountApplicationMode } from '@/lib/api/types';

import { useDiscountDetailsFormContext } from '../../use-form/use-form';

export const DiscountCode = () => {
  const { control, watch, setValue } = useDiscountDetailsFormContext();

  const applicationMode = watch('applicationMode');

  const onGenerate = () => {
    const code = generateDiscountCode();
    setValue('code', code);
  };

  if (applicationMode === DiscountApplicationMode.Code) {
    return (
      <div className="flex gap-2 items-top w-full">
        <FormInput
          control={control}
          name="code"
          label="Code"
          placeholder="0000"
          description="Customers must enter this code on the payment screen"
        />
        <Button type="button" variant="outline" className="mt-[22px]" onClick={onGenerate}>
          Generate
        </Button>
      </div>
    );
  }

  // Automatic
  return (
    <FormInput
      control={control}
      name="code"
      label="Automatic"
      placeholder="Campaign discount"
      description="Customers will see this name on the checkout screen"
    />
  );
};

const nanoid = customAlphabet('123456789ABCDEFGHJKLMNPQRSTUVWXYZ', 12);

/**
 * @description
 * Generate a random discount code
 *
 * TODO: Move to its own file
 */
export function generateDiscountCode(): string {
  return nanoid();
}
