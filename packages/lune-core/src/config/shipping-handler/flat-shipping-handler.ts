import type { ExecutionContext } from '@/api/shared/context/types';
import type { Order } from '@/persistence/entities/order';

import type { Args } from '../common/args.config';

import type { ShippingHandler } from './shipping-handler';

export class FlatShippingHandler implements ShippingHandler {
  name = 'Flat shipping handler';
  code: 'flat-shipping-handler';

  args: Args = {
    price: {
      type: 'price',
      label: 'Price',
      required: true,
      defaultValue: 0
    }
  };

  calculatePrice(_: Order, args: Record<'price', string>, __: ExecutionContext): Promise<number> {
    return Promise.resolve(Number(args.price));
  }
  getPricePreview(args: Record<string, string>, _: ExecutionContext): number {
    return Number(args.price);
  }
}
