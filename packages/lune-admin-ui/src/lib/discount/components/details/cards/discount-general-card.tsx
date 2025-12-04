import { Card, CardContent, CardHeader, CardTitle, FormInput, FormRadioGroup } from '@lune/ui';

import {
  ArgComponent,
  DiscountApplicationMode,
  type EnhancedArg,
  EnhancedArgType
} from '@/lib/api/types';

import { useDiscountDetailsFormContext } from '../use-form/use-form';

import { DiscountCode } from './discount-code/discount-code';
import { DiscountValue } from './discount-value/discount-value';

export const DiscountGeneralCard = () => {
  const { discount, handler, control } = useDiscountDetailsFormContext();

  const args = Object.values(handler.args as EnhancedArg);
  const hasDiscountValueArg = args.find(
    a => a.type === EnhancedArgType.Custom && a.component === ArgComponent.DiscountValue
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>General</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {discount && (
          <FormRadioGroup
            className="flex-row"
            control={control}
            name="applicationMode"
            items={[
              {
                label: 'Discount code',
                value: DiscountApplicationMode.Code
              },
              {
                label: 'Automatic discount',
                value: DiscountApplicationMode.Automatic
              }
            ]}
          />
        )}
        <div className="flex gap-4">
          <DiscountCode />
          <FormInput
            control={control}
            type="number"
            name="perCustomerLimit"
            label="Per customer limit"
            className="w-fit h-fit"
          />
        </div>
        {hasDiscountValueArg && <DiscountValue />}
        {/* <DiscountValue /> */}
      </CardContent>
    </Card>
  );
};
