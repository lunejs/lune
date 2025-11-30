import type { ExecutionContext } from '@/api/shared/context/types';
import { type DiscountHandler, type DiscountListInput } from '@/api/shared/types/graphql';
import { getConfig } from '@/config/config';
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

  findHandlers() {
    return getConfig().discounts.handlers.map(
      (d): DiscountHandler => ({
        name: d.name,
        description: d.description,
        code: d.code,
        args: d.args
      })
    );
  }
}
