import { ExecutionContext } from '@/api/shared/context/types';
import { CreateShopInput, ListInput } from '@/api/shared/types/graphql';
import { ShopRepository } from '@/persistence/repositories/shop-repository';
import { ShopEmailAlreadyExistsError } from './shop.errors';
import { getSlugBy } from '@/libs/slug';
import { clean } from '@vendyx/common';
import { ApiKey } from '@/security/api-key/api-key';

export class ShopService {
  private readonly repository: ShopRepository;

  constructor(private readonly ctx: ExecutionContext) {
    this.repository = ctx.repositories.shop;
  }

  async findBySlug(slug: string) {
    return this.repository.findOne({ where: { slug } });
  }

  async findAll(input?: ListInput) {
    return this.repository.findMany(clean(input ?? {}));
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
    const shopApiKey = ApiKey.generate();

    return this.repository.create({
      ...clean(input),
      slug,
      shopApiKey
    });
  }

  private async validateAndParseSlug(name: string) {
    const slug = getSlugBy(name);

    const shopNameCount = await this.repository.count({ where: { name } });

    if (!shopNameCount) return slug;

    return slug + '-' + shopNameCount;
  }
}
