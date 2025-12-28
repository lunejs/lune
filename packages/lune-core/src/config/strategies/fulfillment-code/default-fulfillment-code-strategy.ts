import type { ExecutionContext } from '@/api/shared/context/types';
import type { Order } from '@/persistence/entities/order';

import type { FulfillmentCodeStrategy } from './fulfillment-code.strategy';

/**
 * @description
 * Default implementation of {@link FulfillmentCodeStrategy} that generates a incremental fulfillment code based on order code.
 *
 * @example
 * ```typescript
 * // Basic usage
 * const strategy = new DefaultFulfillmentCodeStrategy();
 * strategy.generate()
 * // Generates for 1st fulfillment: "#ORDER_CODE-F1"
 * // Generates for 2nd fulfillment: "#ORDER_CODE-F2"
 * ```
 */
export class DefaultFulfillmentCodeStrategy implements FulfillmentCodeStrategy {
  async generate(order: Order, ctx: ExecutionContext): Promise<string> {
    const fulfillmentsInOrder = await ctx.repositories.fulfillment.count({
      where: { orderId: order.id }
    });

    return `${order.code}-F${fulfillmentsInOrder + 1}`;
  }
}
