import { clean } from '@lune/common';

import type { ExecutionContext } from '@/api/shared/context/types';
import type {
  AddCustomerToOrderInput,
  CreateOrderLineInput,
  UpdateOrderLineInput
} from '@/api/shared/types/graphql';
import type { ID } from '@/persistence/entities/entity';
import type { CustomerRepository } from '@/persistence/repositories/customer-repository';
import type { OrderLineRepository } from '@/persistence/repositories/order-line-repository';
import type { OrderRepository } from '@/persistence/repositories/order-repository';
import type { VariantRepository } from '@/persistence/repositories/variant-repository';
import { isValidEmail } from '@/utils/validators';

import { OrderActionsValidator } from './validator/order-actions-validator';
import {
  ForbiddenOrderActionError,
  InvalidCustomerEmailError,
  InvalidQuantityError,
  NotEnoughStockError
} from './order.errors';

export class OrderService {
  private readonly validator: OrderActionsValidator;

  private readonly repository: OrderRepository;
  private readonly lineRepository: OrderLineRepository;
  private readonly variantRepository: VariantRepository;
  private readonly customerRepository: CustomerRepository;

  constructor(ctx: ExecutionContext) {
    this.validator = new OrderActionsValidator();

    this.repository = ctx.repositories.order;
    this.lineRepository = ctx.repositories.orderLine;
    this.variantRepository = ctx.repositories.variant;
    this.customerRepository = ctx.repositories.customer;
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
    if (input.quantity < 0) return new InvalidQuantityError(input.quantity);

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

    const lineWithTheVariant = await this.lineRepository.findOne({
      where: { orderId, variantId: input.productVariantId }
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

    return await this.repository.update({
      where: { id: orderId },
      data: {
        subtotal: order.subtotal + newLinePrice,
        total: order.total + newLinePrice,
        totalQuantity: order.totalQuantity + input.quantity
      }
    });
  }

  async updateLine(lineId: ID, input: UpdateOrderLineInput) {
    if (input.quantity < 0) return new InvalidQuantityError(input.quantity);

    const line = await this.lineRepository.findOneOrThrow({ where: { id: lineId } });

    const [order, variant] = await Promise.all([
      this.repository.findOneOrThrow({ where: { id: line.orderId } }),
      this.variantRepository.findOneOrThrow({ where: { id: line.variantId } })
    ]);

    if (!this.validator.canUpdateLine(order.state)) {
      return new ForbiddenOrderActionError(order.state);
    }

    if (input.quantity <= 0) {
      await this.lineRepository.remove({ where: { id: lineId } });

      return await this.repository.update({
        where: { id: order.id },
        data: {
          subtotal: order.subtotal - line.lineTotal,
          total: order.total - line.lineTotal,
          totalQuantity: order.totalQuantity - line.quantity
        }
      });
    }

    if (variant.stock < input.quantity) {
      return new NotEnoughStockError([variant.id]);
    }

    const unitPrice = variant.salePrice;
    const linePrice = unitPrice * input.quantity;

    await this.lineRepository.update({
      where: { id: lineId },
      data: {
        quantity: input.quantity,
        lineSubtotal: linePrice,
        lineTotal: linePrice,
        unitPrice
      }
    });

    return await this.repository.update({
      where: { id: order.id },
      data: {
        total: order.total - line.lineTotal + linePrice,
        subtotal: order.subtotal - line.lineTotal + linePrice,
        totalQuantity: order.totalQuantity - line.quantity + input.quantity
      }
    });
  }

  async removeLine(lineId: ID) {
    const line = await this.lineRepository.findOneOrThrow({ where: { id: lineId } });
    const order = await this.repository.findOneOrThrow({ where: { id: line.orderId } });

    if (!this.validator.canRemoveLine(order.state)) {
      return new ForbiddenOrderActionError(order.state);
    }

    await this.lineRepository.remove({ where: { id: lineId } });

    return await this.repository.update({
      where: { id: order.id },
      data: {
        total: order.total - line.lineTotal,
        subtotal: order.subtotal - line.lineTotal,
        totalQuantity: order.totalQuantity - line.quantity
      }
    });
  }

  async addCustomer(orderId: ID, input: AddCustomerToOrderInput) {
    if (!isValidEmail(input.email)) {
      return new InvalidCustomerEmailError();
    }

    const order = await this.repository.findOneOrThrow({ where: { id: orderId } });

    if (!this.validator.canAddCustomer(order.state)) {
      return new ForbiddenOrderActionError(order.state);
    }

    const customerUpsert = await this.customerRepository.upsert({
      where: { email: input.email },
      update: input,
      create: {
        ...clean(input),
        enabled: true
      }
    });

    return await this.repository.update({
      where: { id: orderId },
      data: {
        customerId: customerUpsert.id
      }
    });
  }
}
