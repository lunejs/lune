import type { ExecutionContext } from '@/api/shared/context/types';
import type { DiscountListInput } from '@/api/shared/types/graphql';
import type { ID } from '@/persistence/entities/entity';
import type { DiscountRepository } from '@/persistence/repositories/discount-repository';

export class DiscountService {
  private readonly repository: DiscountRepository;

  constructor(ctx: ExecutionContext) {
    this.repository = ctx.repositories.discount;
  }

  async find(input?: DiscountListInput) {
    return await this.repository.findByFilters(input);
  }

  async count(filters?: DiscountListInput['filters']) {
    return await this.repository.countByFilters(filters ?? {});
  }

  async findById(id: ID) {
    return this.repository.findOne({ where: { id } });
  }
}
