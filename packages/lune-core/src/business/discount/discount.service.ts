import type { ExecutionContext } from '@/api/shared/context/types';
import type { DiscountRepository } from '@/persistence/repositories/discount-repository';

export class DiscountService {
  private readonly repository: DiscountRepository;

  constructor(ctx: ExecutionContext) {
    this.repository = ctx.repositories.discount;
  }
}
