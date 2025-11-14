import type { ExecutionContext } from '@/api/shared/context/types';
import { SortKey } from '@/persistence/repositories/repository';
import type { ShippingMethodRepository } from '@/persistence/repositories/shipping-method-repository';

export class ShippingMethodService {
  private readonly repository: ShippingMethodRepository;

  constructor(ctx: ExecutionContext) {
    this.repository = ctx.repositories.shippingMethod;
  }

  async find() {
    return this.repository.findMany({ orderBy: { createdAt: SortKey.Desc } });
  }
}
