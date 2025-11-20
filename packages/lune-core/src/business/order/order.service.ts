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
import type { FulfillmentDiscountHandler } from '@/config/discounts/fulfillment-discount-handler';
import type { OrderDiscountHandler } from '@/config/discounts/order-discount-handler';
import type { OrderLineDiscountHandler } from '@/config/discounts/order-line-discount-handler';
import type { Discount } from '@/persistence/entities/discount';
import { ApplicationMode, type AppliedDiscount } from '@/persistence/entities/discount';
import { ApplicationLevel } from '@/persistence/entities/discount';
import type { ID } from '@/persistence/entities/entity';
import { FulfillmentType } from '@/persistence/entities/fulfillment';
import type { Order } from '@/persistence/entities/order';
import type { CountryRepository } from '@/persistence/repositories/country-repository';
import type { CustomerRepository } from '@/persistence/repositories/customer-repository';
import type { DiscountRepository } from '@/persistence/repositories/discount-repository';
import type { DiscountUsageRepository } from '@/persistence/repositories/discount-usage-repository';
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
  DiscountCodeNotApplicable,
  DiscountHandlerNotFound,
  ForbiddenOrderActionError,
  InvalidCustomerEmailError,
  InvalidQuantityError,
  InvalidShippingMethodError,
  MissingShippingAddress,
  NotEnoughStockError,
  OrderErrorResult
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
  private readonly discountUsageRepository: DiscountUsageRepository;

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

      return this.applyAutomaticDiscounts(orderUpdated);
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

    const orderUpdated = await this.repository.update({
      where: { id: orderId },
      data: {
        subtotal: order.subtotal + newLinePrice,
        total: order.total + newLinePrice,
        totalQuantity: order.totalQuantity + input.quantity
      }
    });

    return this.applyAutomaticDiscounts(orderUpdated);
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

      const orderUpdated = await this.repository.update({
        where: { id: order.id },
        data: {
          subtotal: order.subtotal - line.lineTotal,
          total: order.total - line.lineTotal,
          totalQuantity: order.totalQuantity - line.quantity
        }
      });

      return this.applyAutomaticDiscounts(orderUpdated);
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

    const orderUpdated = await this.repository.update({
      where: { id: order.id },
      data: {
        total: order.total - line.lineTotal + linePrice,
        subtotal: order.subtotal - line.lineTotal + linePrice,
        totalQuantity: order.totalQuantity - line.quantity + input.quantity
      }
    });

    return this.applyAutomaticDiscounts(orderUpdated);
  }

  async removeLine(lineId: ID) {
    const line = await this.lineRepository.findOneOrThrow({ where: { id: lineId } });
    const order = await this.repository.findOneOrThrow({ where: { id: line.orderId } });

    if (!this.validator.canRemoveLine(order.state)) {
      return new ForbiddenOrderActionError(order.state);
    }

    await this.lineRepository.remove({ where: { id: lineId } });

    const orderUpdated = await this.repository.update({
      where: { id: order.id },
      data: {
        total: order.total - line.lineTotal,
        subtotal: order.subtotal - line.lineTotal,
        totalQuantity: order.totalQuantity - line.quantity
      }
    });

    return this.applyAutomaticDiscounts(orderUpdated);
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

    const orderUpdated = await this.repository.update({
      where: { id: orderId },
      data: {
        customerId: customerUpsert.id
      }
    });

    return await this.applyAutomaticDiscounts(orderUpdated);
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

    const orderUpdated = await this.repository.update({
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

    return this.applyAutomaticDiscounts(orderUpdated);
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
        total: shippingPrice,
        type: FulfillmentType.SHIPPING
      },
      update: {
        amount: shippingPrice,
        total: shippingPrice
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

    const orderUpdated = await this.repository.update({
      where: { id: orderId },
      data: {
        total: order.total - (orderFulfillment?.total ?? 0) + shippingPrice
      }
    });

    return this.applyAutomaticDiscounts(orderUpdated);
  }

  async addDiscountCode(orderId: ID, code: string) {
    const order = await this.repository.findOneOrThrow({ where: { id: orderId } });

    if (!this.validator.canModifyDiscounts(order.state)) {
      return new ForbiddenOrderActionError(order.state);
    }

    const discount = await this.discountRepository.findOne({ where: { code } });

    if (!discount?.enabled) return new DiscountCodeNotApplicable();

    const hasFinished = discount.endsAt ? discount.endsAt < new Date() : false;
    const hasStarted = discount.startsAt <= new Date();
    const isActive = hasStarted && !hasFinished;

    if (!isActive) return new DiscountCodeNotApplicable();

    if (order.customerId && discount.perCustomerLimit) {
      const customer = await this.customerRepository.findOneOrThrow({
        where: { id: order.customerId }
      });

      const usages = await this.discountUsageRepository.count({
        where: { customerId: customer.id, discountId: discount.id }
      });

      if (usages >= discount.perCustomerLimit) return new DiscountCodeNotApplicable();
    }

    const handler = getConfig().discounts.handlers.find(h => h.code === discount.handler.code);

    if (!handler) return new DiscountHandlerNotFound();

    return await this.applyDiscount(order, discount, handler);
  }

  private async applyAutomaticDiscounts(order: Order) {
    const hasDiscountCodeApplied = order.appliedDiscounts.find(
      d => d.applicationMode === ApplicationMode.Code
    );

    if (hasDiscountCodeApplied) return order;

    const discounts = await this.discountRepository.findMany({
      where: { applicationMode: ApplicationMode.Automatic }
    });

    if (!discounts.length) return order;

    const applicableDiscounts: { discount: Discount; discountedAmount: number }[] = [];

    for (const discount of discounts) {
      if (!discount?.enabled) continue;

      const hasFinished = discount.endsAt ? discount.endsAt < new Date() : false;
      const hasStarted = discount.startsAt <= new Date();
      const isActive = hasStarted && !hasFinished;

      if (!isActive) continue;

      if (order.customerId && discount.perCustomerLimit) {
        const customer = await this.customerRepository.findOneOrThrow({
          where: { id: order.customerId }
        });

        const usages = await this.discountUsageRepository.count({
          where: { customerId: customer.id, discountId: discount.id }
        });

        if (usages >= discount.perCustomerLimit) continue;
      }

      const handler = getConfig().discounts.handlers.find(h => h.code === discount.handler.code);

      if (!handler) continue;

      if (discount.applicationLevel === ApplicationLevel.Order) {
        const discountHandler = handler as OrderDiscountHandler;

        const canApply = await discountHandler.check(this.ctx, order, discount.handler.args);

        if (!canApply) continue;

        const discountedAmount = await discountHandler.apply(
          this.ctx,
          order,
          discount.handler.args
        );

        applicableDiscounts.push({ discount, discountedAmount: discountedAmount });
      }

      if (discount.applicationLevel === ApplicationLevel.OrderLine) {
        const discountHandler = handler as OrderLineDiscountHandler;

        const orderLines = await this.lineRepository.findMany({ where: { orderId: order.id } });

        let atLeastOneApply = false;
        let accDiscountedAmount = 0;

        for (const line of orderLines) {
          const canApply = await discountHandler.check(
            this.ctx,
            order,
            line,
            discount.handler.args
          );

          if (!canApply) continue;

          atLeastOneApply = true;

          const discountedAmount = await discountHandler.apply(
            this.ctx,
            order,
            line,
            discount.handler.args
          );

          accDiscountedAmount += discountedAmount;
        }

        if (!atLeastOneApply) continue;

        applicableDiscounts.push({ discount, discountedAmount: accDiscountedAmount });
      }

      if (discount.applicationLevel === ApplicationLevel.Fulfillment) {
        const discountHandler = handler as FulfillmentDiscountHandler;

        const fulfillment = await this.fulfillmentRepository.findOne({
          where: { orderId: order.id }
        });

        if (!fulfillment) {
          applicableDiscounts.push({ discount, discountedAmount: 0 });
          continue;
        }

        const canApply = await discountHandler.check(
          this.ctx,
          order,
          fulfillment,
          discount.handler.args
        );

        if (!canApply) continue;

        const discountedAmount = await discountHandler.apply(
          this.ctx,
          order,
          fulfillment,
          discount.handler.args
        );

        applicableDiscounts.push({ discount, discountedAmount });
      }
    }

    if (!applicableDiscounts.length) return order;

    const [{ discount }] = applicableDiscounts.sort(
      (a, b) => b.discountedAmount - a.discountedAmount
    );

    const handler = getConfig().discounts.handlers.find(h => h.code === discount.handler.code);

    // we should return an error? no but what to do when there is no handler?
    if (!handler) return order;

    const result = await this.applyDiscount(order, discount, handler);

    if (result instanceof OrderErrorResult) return order;

    return result;
  }

  private async applyDiscount(
    order: Order,
    discount: Discount,
    handler:
      | OrderDiscountHandler<Record<string, any>>
      | FulfillmentDiscountHandler<Record<string, any>>
      | OrderLineDiscountHandler<Record<string, any>>
  ) {
    if (discount.applicationLevel === ApplicationLevel.Order) {
      const discountHandler = handler as OrderDiscountHandler;

      const canApply = await discountHandler.check(this.ctx, order, discount.handler.args);

      if (!canApply) return new DiscountCodeNotApplicable();

      const discountedAmount = await discountHandler.apply(this.ctx, order, discount.handler.args);

      const appliedDiscount: AppliedDiscount = {
        code: discount.code,
        applicationMode: discount.applicationMode,
        applicationLevel: discount.applicationLevel,
        amount: discountedAmount
      };

      const fulfillment = await this.fulfillmentRepository.findOne({
        where: { orderId: order.id }
      });

      const orderSubtotal = order.subtotal - discountedAmount;

      return await this.repository.update({
        where: { id: order.id },
        data: {
          subtotal: orderSubtotal,
          total: orderSubtotal + (fulfillment?.total ?? 0),
          appliedDiscounts: [appliedDiscount]
        }
      });
    }

    if (discount.applicationLevel === ApplicationLevel.OrderLine) {
      const discountHandler = handler as OrderLineDiscountHandler;

      const orderLines = await this.lineRepository.findMany({ where: { orderId: order.id } });

      for (const line of orderLines) {
        const canApply = await discountHandler.check(this.ctx, order, line, discount.handler.args);

        if (!canApply) continue;

        const discountedAmount = await discountHandler.apply(
          this.ctx,
          order,
          line,
          discount.handler.args
        );

        const appliedDiscount: AppliedDiscount = {
          code: discount.code,
          applicationMode: discount.applicationMode,
          applicationLevel: discount.applicationLevel,
          amount: discountedAmount
        };

        const newTotal = line.lineTotal - discountedAmount;

        line.lineTotal = newTotal;

        await this.lineRepository.update({
          where: { id: line.id },
          data: {
            lineTotal: newTotal,
            appliedDiscounts: [appliedDiscount]
          }
        });
      }

      const fulfillment = await this.fulfillmentRepository.findOne({
        where: { orderId: order.id }
      });
      const newSubtotal = orderLines.reduce((acc, line) => acc + line.lineTotal, 0);

      return await this.repository.update({
        where: { id: order.id },
        data: {
          subtotal: newSubtotal,
          total: newSubtotal + (fulfillment?.total ?? 0)
        }
      });
    }

    if (discount.applicationLevel === ApplicationLevel.Fulfillment) {
      const discountHandler = handler as FulfillmentDiscountHandler;

      const fulfillment = await this.fulfillmentRepository.findOne({
        where: { orderId: order.id }
      });

      const appliedDiscount: AppliedDiscount = {
        code: discount.code,
        applicationMode: discount.applicationMode,
        applicationLevel: discount.applicationLevel,
        amount: 0
      };

      if (!fulfillment) {
        return await this.repository.update({
          where: { id: order.id },
          data: {
            appliedDiscounts: [appliedDiscount]
          }
        });
      }

      const canApply = await discountHandler.check(
        this.ctx,
        order,
        fulfillment,
        discount.handler.args
      );

      if (!canApply) return new DiscountCodeNotApplicable();

      const discountedAmount = await discountHandler.apply(
        this.ctx,
        order,
        fulfillment,
        discount.handler.args
      );

      const newFulfillmentTotal = fulfillment.amount - discountedAmount;

      await this.fulfillmentRepository.update({
        where: { id: fulfillment.id },
        data: {
          total: newFulfillmentTotal
        }
      });

      return await this.repository.update({
        where: { id: order.id },
        data: {
          total: order.subtotal + newFulfillmentTotal,
          appliedDiscounts: [{ ...appliedDiscount, amount: discountedAmount }]
        }
      });
    }
  }
}
