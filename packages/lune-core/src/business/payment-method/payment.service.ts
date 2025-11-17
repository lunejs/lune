import { clean } from '@lune/common';

import type { ExecutionContext } from '@/api/shared/context/types';
import type {
  CreatePaymentMethodInput,
  UpdatePaymentMethodInput
} from '@/api/shared/types/graphql';
import { getConfig } from '@/config/config';
import type { ID } from '@/persistence/entities/entity';
import type { PaymentMethodRepository } from '@/persistence/repositories/payment-method-repository';
import { SortKey } from '@/persistence/repositories/repository';

import { PaymentHandlerNotFoundError } from './payment-method.errors';

export class PaymentMethodService {
  private readonly repository: PaymentMethodRepository;

  constructor(ctx: ExecutionContext) {
    this.repository = ctx.repositories.paymentMethod;
  }

  async find() {
    return this.repository.findMany({ orderBy: { createdAt: SortKey.Desc } });
  }

  async findHandlers() {
    const handlers = getConfig().shipping.handlers;

    return handlers.map(h => ({ name: h.name, code: h.code, args: h.args }));
  }

  async create(input: CreatePaymentMethodInput) {
    const handler = getConfig().payments.handlers.find(s => s.code === input.handler.code);

    if (!handler) {
      return new PaymentHandlerNotFoundError(input.handler.code);
    }

    return await this.repository.create({
      ...clean(input),
      enabled: input.enabled ?? true
    });
  }

  async update(id: ID, input: UpdatePaymentMethodInput) {
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
    await this.repository.remove({ where: { id } });

    return true;
  }
}
