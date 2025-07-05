import { ExecutionContext } from '@/api/shared/context/types';
import { CreateShopInput } from '@/api/shared/types/graphql';
import { ShopRepository } from '@/persistence/repositories/shop-repository';
import { disableRLS } from '@/persistence/rls';
import { EmailAlreadyExistsError } from './shop.errors';
import { getSlugBy } from '@/libs/slug';
import { clean } from '@/utils/obj';

export class ShopService {
  repository: ShopRepository;

  constructor(private readonly ctx: ExecutionContext) {
    this.repository = ctx.repositories.shop;
  }

  async findBySlug(slug: string) {
    return this.repository.findOne({ where: { slug } });
  }

  async create(input: CreateShopInput) {
    await disableRLS(this.ctx);

    const emailExists = await this.repository.findOne({ where: { email: input.email } });

    if (emailExists) {
      return new EmailAlreadyExistsError();
    }

    const slug = await this.validateAndParseSlug(input.name);
    const shopApiKey = 'temporary-api-key'; // TODO: Generate a real API key

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

/**
 * - Generate shop api key (pretty)
 * - Move utils (obj.ts and types.ts) to common package (or shared i dont remember how it is called))
 */
