import type { ExecutionContext } from '@/api/shared/context/types';
import type { Order } from '@/persistence/entities/order';

import type { Args } from '../common/args.config';

export interface DiscountResult {
  discountedAmount: number;
  affectedLines?: {
    lineId: string;
    discountedAmount: number;
  }[];
}

export interface DiscountHandler {
  code: string;

  args: Args;

  check(ctx: ExecutionContext, order: Order, args: Record<string, any>): Promise<boolean>;

  apply(ctx: ExecutionContext, order: Order, args: Record<string, any>): Promise<DiscountResult>;
}
