import { clean, getSlugBy } from '@lunejs/common';

import type { ExecutionContext } from '@/api/shared/context/types';
import type { CreateShopInput, ListInput, UpdateShopInput } from '@/api/shared/types/graphql';
import type { ID } from '@/persistence/entities/entity';
import { SortKey } from '@/persistence/repositories/repository';
import type { ShopRepository } from '@/persistence/repositories/shop-repository';
import { ApiKey } from '@/security/api-key/api-key';

import { ShopEmailAlreadyExistsError } from './shop.errors';

export class ShopService {
  private readonly repository: ShopRepository;

  constructor(private readonly ctx: ExecutionContext) {
    this.repository = ctx.repositories.shop;
  }

  async findUnique(id?: ID, slug?: string) {
    if (id) return this.repository.findOne({ where: { id } });
    if (slug) return this.repository.findOne({ where: { slug } });

    return null;
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

  async update(id: ID, input: UpdateShopInput) {
    if (input.email) {
      const emailExists = await this.ctx.runWithoutRLS(() =>
        this.repository.findOne({ where: { email: input.email as string } })
      );

      if (emailExists && emailExists.id !== id) {
        return new ShopEmailAlreadyExistsError();
      }
    }

    return this.repository.update({
      where: { id },
      data: {
        ...clean(input),
        logo: input.logo,
        storefrontUrl: input.storefrontUrl
      }
    });
  }

  private async validateAndParseSlug(name: string) {
    const slug = getSlugBy(name);

    const shopNameCount = await this.repository.count({ where: { name } });

    if (!shopNameCount) return slug;

    return slug + '-' + shopNameCount;
  }
}
