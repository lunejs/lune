import type { ExecutionContext } from '@/api/shared/context/types';
import type { ID } from '@/persistence/entities/entity';
import type { OrderRepository } from '@/persistence/repositories/order-repository';

export class OrderService {
  private readonly repository: OrderRepository;

  constructor(ctx: ExecutionContext) {
    this.repository = ctx.repositories.order;
  }

  async findUnique({ id, code }: { id?: ID; code?: string }) {
    if (id) {
      return this.repository.findOne({ where: { id } });
    }

    if (code) {
      return this.repository.findOne({ where: { code } });
    }
  }
}
