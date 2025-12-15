import type { ExecutionContext } from '@/api/shared/context/types';
import type { Order } from '@/persistence/entities/order';

/**
 * @description
 * The `OrderCodeStrategy` is responsible for generating a unique order code.
 *
 * Order codes are human-readable identifiers displayed to customers and merchants
 * (e.g., in confirmation emails, invoices, and the admin dashboard).
 *
 * @example
 * ```typescript
 * const strategy: OrderCodeStrategy = {
 *   generate: (order, ctx) => `ORD-${Date.now()}`
 * };
 * ```
 */
export interface OrderCodeStrategy {
  /**
   * @description
   * Generates a unique code for the given order.
   */
  generate(order: Order, ctx: ExecutionContext): string | Promise<string>;
}
