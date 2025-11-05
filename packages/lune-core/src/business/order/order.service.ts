import type { ExecutionContext } from '@/api/shared/context/types';
import type { CreateOrderLineInput } from '@/api/shared/types/graphql';
import type { ID } from '@/persistence/entities/entity';
import type { OrderLineRepository } from '@/persistence/repositories/order-line-repository';
import type { OrderRepository } from '@/persistence/repositories/order-repository';
import type { VariantRepository } from '@/persistence/repositories/variant-repository';

import { OrderActionsValidator } from './validator/order-actions-validator';
import { ForbiddenOrderActionError, NotEnoughStockError } from './order.errors';

export class OrderService {
  private readonly validator: OrderActionsValidator;

  private readonly repository: OrderRepository;
  private readonly lineRepository: OrderLineRepository;
  private readonly variantRepository: VariantRepository;

  constructor(ctx: ExecutionContext) {
    this.validator = new OrderActionsValidator();

    this.repository = ctx.repositories.order;
    this.lineRepository = ctx.repositories.orderLine;
    this.variantRepository = ctx.repositories.variant;
  }

  async findUnique({ id, code }: { id?: ID; code?: string }) {
    if (id) {
      return this.repository.findOne({ where: { id } });
    }

    if (code) {
      return this.repository.findOne({ where: { code } });
    }
  }

  async addLine(orderId: ID, input: CreateOrderLineInput) {
    const order = await this.repository.findOneOrThrow({ where: { id: orderId } });

    if (!this.validator.canAddLine(order.state)) {
      return new ForbiddenOrderActionError(order.state);
    }

    const variant = await this.variantRepository.findOneOrThrow({
      where: { id: input.productVariantId }
    });

    if (variant.stock < input.quantity) {
      return new NotEnoughStockError([variant.id]);
    }

    const lineWithTheVariant = await this.lineRepository.findOneOrThrow({
      where: { variantId: input.productVariantId }
    });

    const newLinePrice = (input.quantity + (lineWithTheVariant?.quantity ?? 0)) * variant.salePrice;

    if (lineWithTheVariant) {
      const newQuantity = input.quantity + lineWithTheVariant.quantity;

      if (variant.stock < newQuantity) {
        return new NotEnoughStockError([variant.id]);
      }

      await this.lineRepository.update({
        where: { id: lineWithTheVariant.id },
        data: {
          // Increment the quantity because variant already exists
          quantity: lineWithTheVariant.quantity + input.quantity,
          // Recalculate the line price with the variant sale price because this can change
          lineSubtotal: (input.quantity + lineWithTheVariant.quantity) * variant.salePrice,
          lineTotal: (input.quantity + lineWithTheVariant.quantity) * variant.salePrice,
          // Update the unit price in case the variant price has changed
          unitPrice: variant.salePrice
        }
      });

      const orderUpdated = await this.repository.update({
        where: { id: orderId },
        data: {
          // Remove the old line price and add the new one
          subtotal: order.subtotal - lineWithTheVariant.lineTotal + newLinePrice,
          total: order.total - lineWithTheVariant.lineTotal + newLinePrice,
          // Increment the quantity because variant already exists
          totalQuantity: order.totalQuantity + input.quantity
        }
      });

      return orderUpdated;
    }

    await this.lineRepository.create({
      variantId: input.productVariantId,
      quantity: input.quantity,
      lineSubtotal: newLinePrice,
      lineTotal: newLinePrice,
      unitPrice: variant.salePrice,
      orderId
    });

    await this.repository.update({
      where: { id: orderId },
      data: {
        subtotal: order.subtotal + newLinePrice,
        total: order.total + newLinePrice,
        totalQuantity: order.totalQuantity + input.quantity
      }
    });
  }
}
