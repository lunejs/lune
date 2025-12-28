import type { ExecutionContext } from '@/api/shared/context/types';
import type { Order } from '@/persistence/entities/order';

/**
 * @description
 * The `FulfillmentCodeStrategy` is responsible for generating a unique fulfillment code.
 *
 * Fulfillment codes are human-readable identifiers displayed to customers and merchants
 * (e.g., in confirmation emails, invoices, and the admin dashboard).
 *
 * @example
 * ```typescript
 * export class DefaultFulfillmentCodeStrategy implements FulfillmentCodeStrategy {
 *   async generate(_fulfillment: Fulfillment, order: Order, ctx: ExecutionContext): Promise<string> {
 *     const fulfillmentsInOrder = await ctx.repositories.fulfillment.count({
 *       where: { orderId: order.id }
 *     });
 *
 *     return `${order.code}-F${fulfillmentsInOrder + 1}`;
 *   }
 * }
 * ```
 */
export interface FulfillmentCodeStrategy {
  /**
   * @description
   * Generates a unique code for the given fulfillment.
   */
  generate(order: Order, ctx: ExecutionContext): string | Promise<string>;
}
