import { Card, CardContent, CardHeader, CardTitle, FormInput, FormRadioGroup } from '@lune/ui';

import { ArgComponent, DiscountApplicationMode } from '@/lib/api/types';

import { DiscountArgComponent } from '../args/discount-arg-component';
import { useDiscountDetailsFormContext } from '../use-form/use-form';

import { DiscountCode } from './discount-code/discount-code';

export const DiscountGeneralCard = () => {
  const { discount, control } = useDiscountDetailsFormContext();

  return (
    <Card>
      <CardHeader>
        <CardTitle>General</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {!discount && (
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
        <div className="flex flex-col gap-4 sm:flex-row">
          <DiscountCode />
          <FormInput
            control={control}
            type="number"
            name="perCustomerLimit"
            label="Per customer limit"
            className="w-full h-fit sm:w-fit"
          />
        </div>
        <DiscountArgComponent component={ArgComponent.DiscountValue} />
      </CardContent>
    </Card>
  );
};
