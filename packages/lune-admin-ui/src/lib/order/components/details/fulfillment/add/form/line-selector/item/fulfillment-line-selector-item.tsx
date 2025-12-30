import { Badge, Checkbox, cn, Muted, Small } from '@lunejs/ui';

import type { CommonOrderFragment } from '@/lib/api/types';
import { ImagePlaceholder } from '@/shared/components/placeholders/image-placeholder';

import { useAddFulfillmentFormContext } from '../../use-form';

import { FulfillmentLineQuantitySelector } from './fulfillment-line-quantity-selector';

export const FulfillmentLineSelectorItem = ({ line, isSelected, remainingQuantity }: Props) => {
  const form = useAddFulfillmentFormContext();

  const image =
    line.variant.assets.items[0]?.source ?? line.variant.product.assets.items[0]?.source;

  return (
    <label
      className={cn(
        'flex items-center justify-between py-4 px-6 hover:bg-muted/50 transition-colors',
        isSelected && 'bg-muted/50'
      )}
    >
      <div>
        <div className="flex items-center gap-2">
          <Checkbox
            checked={isSelected}
            onCheckedChange={value => {
              if (value) {
                form.setValue('orderLines', [
                  ...form.getValues('orderLines'),
                  { id: line.id, quantity: remainingQuantity }
                ]);
                return;
              }

              form.setValue(
                'orderLines',
                form.getValues('orderLines').filter(l => l.id !== line.id)
              );
            }}
          />
          {image ? (
            <img className="size-12 object-cover rounded-md" src={image} />
          ) : (
            <ImagePlaceholder initial={line.variant.product.name} />
          )}
          <div>
            <Small>{line.variant.product.name}</Small>
            <Muted>{line.variant.optionValues.map(opv => opv.name).join(' / ')}</Muted>
          </div>
        </div>
      </div>
      <div>
        {isSelected && remainingQuantity !== 1 ? (
          <FulfillmentLineQuantitySelector
            remainingQuantity={remainingQuantity}
            onChange={quantity => {
              form.setValue(
                'orderLines',
                form
                  .getValues('orderLines')
                  .map(orderLine =>
                    line.id === orderLine.id ? { ...orderLine, quantity } : orderLine
                  )
              );
            }}
          />
        ) : (
          <>
            x
            <Badge className="ml-2" variant={'secondary'}>
              {remainingQuantity}
            </Badge>
          </>
        )}
      </div>
    </label>
  );
};

type Props = {
  isSelected: boolean;
  line: CommonOrderFragment['lines']['items'][0];
  remainingQuantity: number;
};
