import { clean } from '@lune/common';

import type { ExecutionContext } from '@/api/shared/context/types';
import type { CreateDiscountInput, UpdateDiscountInput } from '@/api/shared/types/graphql';
import { type DiscountListInput } from '@/api/shared/types/graphql';
import { getConfig } from '@/config/config';
import type { ApplicationLevel, ApplicationMode } from '@/persistence/entities/discount';
import type { ID } from '@/persistence/entities/entity';
import type { DiscountRepository } from '@/persistence/repositories/discount-repository';

import { DiscountCodeAlreadyExistsError } from './discount.error';

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
    return getConfig().discounts.handlers;
  }

  async create(input: CreateDiscountInput) {
    const alreadyExists = await this.repository.findOne({ where: { code: input.code } });

    if (alreadyExists) return new DiscountCodeAlreadyExistsError(input.code);

    return await this.repository.create({
      ...clean(input),
      combinable: false,
      enabled: input.enabled ?? true,
      applicationMode: input.applicationMode as unknown as ApplicationMode,
      applicationLevel: input.applicationLevel as unknown as ApplicationLevel
    });
  }

  async update(id: ID, input: UpdateDiscountInput) {
    if (input.code) {
      const alreadyExists = await this.repository.findOne({ where: { code: input.code } });

      if (alreadyExists && alreadyExists.id !== id) {
        return new DiscountCodeAlreadyExistsError(input.code);
      }
    }

    return await this.repository.update({
      where: { id },
      data: {
        ...clean(input),
        perCustomerLimit: input.perCustomerLimit,
        endsAt: input.endsAt
      }
    });
  }

  async softRemove(ids: ID[]) {
    await this.repository.softRemoveMany({ whereIn: 'id', values: ids });

    return true;
  }
}
