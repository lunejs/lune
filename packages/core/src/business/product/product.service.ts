import { ExecutionContext } from '@/api/shared/context/types';
import { ProductListInput } from '@/api/shared/types/graphql';
import { ID } from '@/persistence/entities/entity';
import { Product } from '@/persistence/entities/product';
import { ProductRepository } from '@/persistence/repositories/product-repository';
import { Where } from '@/persistence/repositories/repository';

export class ProductService {
  private repository: ProductRepository;

  constructor(private ctx: ExecutionContext) {
    this.repository = ctx.repositories.product;
  }

  async find(input?: ProductListInput) {
    return this.repository.findByFilters(input ?? {});
  }

  async count(input?: ProductListInput['filters']) {
    return this.repository.countByFilters(input ?? {});
  }

  async findUnique(id?: ID, slug?: string, options?: Where<Product>) {
    if (id) return this.repository.findOne({ where: { id, ...options } });
    if (slug) return this.repository.findOne({ where: { slug, ...options } });

    return null;
  }
}
