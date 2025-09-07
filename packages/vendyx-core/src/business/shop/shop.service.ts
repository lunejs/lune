import { clean } from '@vendyx/common';

import { ExecutionContext } from '@/api/shared/context/types';
import { CreateShopInput, ListInput } from '@/api/shared/types/graphql';
import { getSlugBy } from '@/libs/slug';
import { SortKey } from '@/persistence/repositories/repository';
import { ShopRepository } from '@/persistence/repositories/shop-repository';
import { ApiKey } from '@/security/api-key/api-key';

import { ShopEmailAlreadyExistsError } from './shop.errors';

export class ShopService {
  private readonly repository: ShopRepository;

  constructor(private readonly ctx: ExecutionContext) {
    this.repository = ctx.repositories.shop;
  }

  async findBySlug(slug: string) {
    return this.repository.findOne({ where: { slug } });
  }

  async findAll(input?: ListInput) {
    return this.repository.findMany({ ...clean(input ?? {}), orderBy: { createdAt: SortKey.Asc } });
  }

  async count() {
    return this.repository.count();
  }

  async create(input: CreateShopInput) {
    const emailExists = await this.ctx.runWithoutRLS(() =>
      this.repository.findOne({ where: { email: input.email } })
    );

    if (emailExists) {
      return new ShopEmailAlreadyExistsError();
    }

    const slug = await this.validateAndParseSlug(input.name);
    const storefrontApiKey = ApiKey.generate();

    return this.repository.create({
      ...clean(input),
      slug,
      storefrontApiKey
    });
  }

  private async validateAndParseSlug(name: string) {
    const slug = getSlugBy(name);

    const shopNameCount = await this.repository.count({ where: { name } });

    if (!shopNameCount) return slug;

    return slug + '-' + shopNameCount;
  }
}
