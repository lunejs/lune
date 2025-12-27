import type { ExecutionContext } from '@/api/shared/context/types';
import type { DeliveryMethod } from '@/persistence/entities/delivery-method';
import type { Order } from '@/persistence/entities/order';

import type { Args, InferArgs } from '../common/args.config';

/**
 * @description
 * Creates delivery method level discounts
 */
export class DeliveryMethodDiscountHandler<TArgs extends Args = Args> {
  name: string;
  description: string;
  code: string;
  args: TArgs;
  check: Config<TArgs>['check'];
  apply: Config<TArgs>['apply'];

  constructor(config: Config<TArgs>) {
    this.name = config.name;
    this.description = config.description;
    this.code = config.code;
    this.args = config.args;
    this.check = config.check;
    this.apply = config.apply;
  }
}

type Config<TArgs> = {
  /**
   * @description
   * Name for the handler
   */
  name: string;
  /**
   * @description
   * Description for the handler
   */
  description: string;
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
    fulfillment: DeliveryMethod,
    args: InferArgs<TArgs>
  ) => Promise<boolean>;
  /**
   * @description
   * Calculates the discount amount to apply to the order.
   */
  apply: (
    ctx: ExecutionContext,
    order: Order,
    fulfillment: DeliveryMethod,
    args: InferArgs<TArgs>
  ) => Promise<number>;
};
