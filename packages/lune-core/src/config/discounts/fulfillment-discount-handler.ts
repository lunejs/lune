import type { ExecutionContext } from '@/api/shared/context/types';
import type { Fulfillment } from '@/persistence/entities/fulfillment';
import type { Order } from '@/persistence/entities/order';

import type { Args, InferArgs } from '../common/args.config';

/**
 * @description
 * Creates fulfillment-level discounts
 */
export class FulfillmentDiscountHandler<TArgs extends Args = Args> {
  code: string;
  args: TArgs;
  check: Config<TArgs>['check'];
  apply: Config<TArgs>['apply'];

  constructor(config: Config<TArgs>) {
    this.code = config.code;
    this.args = config.args;
    this.check = config.check;
    this.apply = config.apply;
  }
}

type Config<TArgs> = {
  /**
   * @description
   * Unique identifier for this handler ej. 'black-friday-discount'
   */
  code: string;
  /**
   * @description
   * arguments for this discount, used to show admin UI inputs
   */
  args: TArgs;
  /**
   * @description
   * Validates whether the discount can be applied to the order.
   */
  check: (
    ctx: ExecutionContext,
    order: Order,
    fulfillment: Fulfillment,
    args: InferArgs<TArgs>
  ) => Promise<boolean>;
  /**
   * @description
   * Calculates the discount amount to apply to the order.
   */
  apply: (
    ctx: ExecutionContext,
    order: Order,
    fulfillment: Fulfillment,
    args: InferArgs<TArgs>
  ) => Promise<number>;
};
