import { clean } from '@lune/common';

import type { ExecutionContext } from '@/api/shared/context/types';
import type {
  CreateShippingMethodInput,
  UpdateShippingMethodInput
} from '@/api/shared/types/graphql';
import { getConfig } from '@/config/config';
import type { ID } from '@/persistence/entities/entity';
import { SortKey } from '@/persistence/repositories/repository';
import type { ShippingMethodRepository } from '@/persistence/repositories/shipping-method-repository';

import { ShippingHandlerNotFoundError } from './shipping-method.errors';

export class ShippingMethodService {
  private readonly repository: ShippingMethodRepository;

  constructor(ctx: ExecutionContext) {
    this.repository = ctx.repositories.shippingMethod;
  }

  async find() {
    return this.repository.findMany({ orderBy: { createdAt: SortKey.Desc } });
  }

  async findHandlers() {
    const handlers = getConfig().shipping.handlers;

    return handlers.map(h => ({ name: h.name, code: h.code, args: h.args }));
  }

  async create(input: CreateShippingMethodInput) {
    const handler = getConfig().shipping.handlers.find(s => s.code === input.handler.code);

    if (!handler) {
      return new ShippingHandlerNotFoundError(input.handler.code);
    }

    return await this.repository.create({
      ...clean(input),
      enabled: input.enabled ?? true
    });
  }

  async update(id: ID, input: UpdateShippingMethodInput) {
    const method = await this.repository.findOneOrThrow({ where: { id } });

    const { args, ...baseMethod } = input;

    return await this.repository.update({
      where: { id },
      data: {
        ...clean(baseMethod),
        handler: {
          ...method.handler,
          args: args ?? method.handler.args
        }
      }
    });
  }

  async remove(id: ID) {
    await this.repository.softRemove({ where: { id } });

    return true;
  }
}
