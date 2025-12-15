import { customAlphabet } from 'nanoid';

import type { ExecutionContext } from '@/api/shared/context/types';
import type { Order } from '@/persistence/entities/order';

import type { OrderCodeStrategy } from './order-code.strategy';

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

/**
 * @description
 * Default implementation of {@link OrderCodeStrategy} that generates alphanumeric order codes.
 *
 * Uses nanoid with a custom alphabet (0-9, A-Z) to generate 8-character codes,
 * with optional prefix and suffix.
 *
 * @example
 * ```typescript
 * // Basic usage
 * const strategy = new DefaultOrderCodeStrategy({});
 * // Generates: "A1B2C3D4"
 *
 * // With prefix and suffix
 * const strategy = new DefaultOrderCodeStrategy({ prefix: 'ORD-', subfix: '-2024' });
 * // Generates: "ORD-A1B2C3D4-2024"
 * ```
 */
export class DefaultOrderCodeStrategy implements OrderCodeStrategy {
  constructor(private readonly options: Options = {}) {}

  generate(_order: Order, _ctx: ExecutionContext): string | Promise<string> {
    const { prefix, subfix } = this.options;

    const code = customAlphabet(alphabet, 8)();

    return `${prefix ?? ''}${code}${subfix ?? ''}`;
  }
}

type Options = {
  /** String prepended to the generated code */
  prefix?: string;
  /** String appended to the generated code */
  subfix?: string;
};
