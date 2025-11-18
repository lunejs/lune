import { clean } from '@lune/common';

import type { ExecutionContext } from '@/api/shared/context/types';
import type {
  AddCustomerToOrderInput,
  AddShippingFulfillmentInput,
  CreateOrderAddressInput,
  CreateOrderLineInput,
  UpdateOrderLineInput
} from '@/api/shared/types/graphql';
import { getConfig } from '@/config/config';
import type { AppliedDiscount } from '@/persistence/entities/discount';
import { ApplicationLevel } from '@/persistence/entities/discount';
import type { ID } from '@/persistence/entities/entity';
import { FulfillmentType } from '@/persistence/entities/fulfillment';
import type { CountryRepository } from '@/persistence/repositories/country-repository';
import type { CustomerRepository } from '@/persistence/repositories/customer-repository';
import type { DiscountRepository } from '@/persistence/repositories/discount-repository';
import type { FulfillmentRepository } from '@/persistence/repositories/fulfillment-repository';
import type { OrderLineRepository } from '@/persistence/repositories/order-line-repository';
import type { OrderRepository } from '@/persistence/repositories/order-repository';
import type { ShippingFulfillmentRepository } from '@/persistence/repositories/shipping-fulfillment-repository';
import type { ShippingMethodRepository } from '@/persistence/repositories/shipping-method-repository';
import type { StateRepository } from '@/persistence/repositories/state-repository';
import type { VariantRepository } from '@/persistence/repositories/variant-repository';
import { isValidEmail } from '@/utils/validators';

import { OrderActionsValidator } from './validator/order-actions-validator';
import {
  ForbiddenOrderActionError,
  InvalidCustomerEmailError,
  InvalidQuantityError,
  InvalidShippingMethodError,
  MissingShippingAddress,
  NotEnoughStockError
} from './order.errors';

export class OrderService {
  private readonly validator: OrderActionsValidator;

  private readonly repository: OrderRepository;
  private readonly lineRepository: OrderLineRepository;
  private readonly variantRepository: VariantRepository;
  private readonly customerRepository: CustomerRepository;
  private readonly countryRepository: CountryRepository;
  private readonly stateRepository: StateRepository;
  private readonly shippingMethodRepository: ShippingMethodRepository;
  private readonly fulfillmentRepository: FulfillmentRepository;
  private readonly shippingFulfillmentRepository: ShippingFulfillmentRepository;
  private readonly discountRepository: DiscountRepository;

  constructor(private readonly ctx: ExecutionContext) {
    this.validator = new OrderActionsValidator();

    this.repository = ctx.repositories.order;
    this.lineRepository = ctx.repositories.orderLine;
    this.variantRepository = ctx.repositories.variant;
    this.customerRepository = ctx.repositories.customer;
    this.countryRepository = ctx.repositories.country;
    this.stateRepository = ctx.repositories.state;
    this.shippingMethodRepository = ctx.repositories.shippingMethod;
    this.fulfillmentRepository = ctx.repositories.fulfillment;
    this.shippingFulfillmentRepository = ctx.repositories.shippingFulfillment;
    this.discountRepository = ctx.repositories.discount;
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
      orderId,
      appliedDiscounts: []
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

  async addShippingAddress(orderId: ID, input: CreateOrderAddressInput) {
    const order = await this.repository.findOneOrThrow({ where: { id: orderId } });

    if (!this.validator.canAddShippingAddress(order.state)) {
      return new ForbiddenOrderActionError(order.state);
    }

    const country = await this.countryRepository.findOneOrThrow({
      where: { code: input.countryCode }
    });

    const state = await this.stateRepository.findOneOrThrow({
      where: { code: input.stateCode, countryId: country.id }
    });

    return await this.repository.update({
      where: { id: orderId },
      data: {
        shippingAddress: {
          ...order.shippingAddress,
          ...input,
          country: country.name,
          countryCode: country.code,
          state: state.name,
          stateCode: state.code
        }
      }
    });
  }

  async addShippingFulfillment(orderId: ID, input: AddShippingFulfillmentInput) {
    const order = await this.repository.findOneOrThrow({ where: { id: orderId } });

    if (!order.shippingAddress) {
      return new MissingShippingAddress();
    }

    if (!this.validator.canAddShippingFulfillment(order)) {
      return new ForbiddenOrderActionError(order.state);
    }

    const country = await this.countryRepository.findOneOrThrow({
      where: { code: order.shippingAddress?.countryCode },
      fields: ['id']
    });

    const state = await this.stateRepository.findOneOrThrow({
      where: { code: order.shippingAddress?.stateCode, countryId: country.id },
      fields: ['id']
    });

    const method = await this.shippingMethodRepository.findEnabledByIdAndState(
      input.methodId,
      state.id
    );

    if (!method) {
      return new InvalidShippingMethodError();
    }

    const shippingHandler = getConfig().shipping.handlers.find(h => h.code === method.handler.code);

    // TODO: validate this or handle properly
    if (!shippingHandler) {
      throw new Error(`shipping handler not found with code ${method.handler.code}`);
    }

    // What happen if calculate price throws and error?
    const shippingPrice = await shippingHandler?.calculatePrice(
      order,
      method.handler.args,
      this.ctx
    );

    const orderFulfillment = await this.fulfillmentRepository.findOne({ where: { orderId } });

    const fulfillment = await this.fulfillmentRepository.upsert({
      where: { id: orderFulfillment?.id },
      create: {
        orderId,
        amount: shippingPrice,
        type: FulfillmentType.SHIPPING
      },
      update: {
        amount: shippingPrice
      }
    });

    await this.shippingFulfillmentRepository.upsert({
      where: { fulfillmentId: orderFulfillment?.id },
      create: {
        fulfillmentId: fulfillment.id,
        method: method.name,
        shippingMethodId: method.id
      },
      update: {
        method: method.name,
        shippingMethodId: method.id
      }
    });

    return await this.repository.update({
      where: { id: orderId },
      data: {
        total: order.total - (orderFulfillment?.amount ?? 0) + shippingPrice
      }
    });
  }

  async addDiscountCode(orderId: ID, code: string) {
    const order = await this.repository.findOneOrThrow({ where: { id: orderId } });

    if (!this.validator.canModifyDiscounts(order.state)) {
      throw new Error('Forbidden');
    }

    const discount = await this.discountRepository.findOne({ where: { handle: code } });

    if (!discount?.enabled) {
      throw new Error('Invalid discount code');
    }

    const handler = getConfig().discounts.handlers.find(h => h.code === discount.handler.code);

    if (!handler) throw new Error('Handler not found');

    const isEligible = await handler.check(this.ctx, order, discount.handler.args);

    if (!isEligible) throw new Error('Invalid discount code');

    const result = await handler.apply(this.ctx, order, discount.handler.args);

    const appliedDiscount: AppliedDiscount = {
      handle: discount.handle,
      applicationMode: discount.applicationMode,
      applicationLevel: discount.applicationLevel,
      amount: result.discountedAmount
    };

    if (discount.applicationLevel === ApplicationLevel.Order) {
      const fulfillment = await this.fulfillmentRepository.findOne({ where: { orderId } });

      const orderSubtotal = order.subtotal - result.discountedAmount;

      return await this.repository.update({
        where: { id: order.id },
        data: {
          subtotal: orderSubtotal,
          total: orderSubtotal + (fulfillment?.amount ?? 0),
          appliedDiscounts: [appliedDiscount]
        }
      });
    }

    if (discount.applicationLevel === ApplicationLevel.OrderLine) {
      const orderLines = await this.lineRepository.findMany({ where: { orderId } });

      if (!result.affectedLines?.length) return order;

      for (const lineToUpdate of result.affectedLines) {
        const line = orderLines.find(l => l.id === lineToUpdate.lineId);

        if (!line) continue;

        line.lineTotal = line.lineTotal - lineToUpdate.discountedAmount;

        await this.lineRepository.update({
          where: { id: line.id },
          data: {
            lineTotal: line.lineTotal - lineToUpdate.discountedAmount,
            appliedDiscounts: [{ ...appliedDiscount, amount: lineToUpdate.discountedAmount }]
          }
        });
      }

      const fulfillment = await this.fulfillmentRepository.findOne({ where: { orderId } });
      const newSubtotal = orderLines.reduce((acc, line) => acc + line.lineTotal, 0);

      return await this.repository.update({
        where: { id: orderId },
        data: {
          subtotal: newSubtotal,
          total: newSubtotal + (fulfillment?.amount ?? 0)
        }
      });
    }

    // TODO: hacer esto pero primero probar los otros caoss
    // if (discount.applicationLevel === ApplicationLevel.Fulfillment) {

    // }
  }
}

// trato de hacer las interfaces de los desxcuentos, asi como sus flujos, batallo en saber si debo regresar el preico descontado o el precio despues de aplicar el descuento
// tamien en entender el flujo
// tambien en eso del as OrderDiscountHandler, estaria bien tener solo un tipo
