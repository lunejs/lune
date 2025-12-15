import { clean } from '@lune/common';

import type { ExecutionContext } from '@/api/shared/context/types';
import type {
  AddCustomerToOrderInput,
  AddInStorePickupFulfillmentInput,
  AddPaymentToOrderInput,
  AddShippingFulfillmentInput,
  CreateOrderAddressInput,
  CreateOrderInput,
  CreateOrderLineInput,
  OrderListInput,
  UpdateOrderLineInput
} from '@/api/shared/types/graphql';
import { getConfig } from '@/config/config';
import type { ID } from '@/persistence/entities/entity';
import { FulfillmentType } from '@/persistence/entities/fulfillment';
import { OrderState } from '@/persistence/entities/order';
import { PaymentState } from '@/persistence/entities/payment';
import type { CountryRepository } from '@/persistence/repositories/country-repository';
import type { CustomerRepository } from '@/persistence/repositories/customer-repository';
import type { DiscountRepository } from '@/persistence/repositories/discount-repository';
import type { FulfillmentRepository } from '@/persistence/repositories/fulfillment-repository';
import type { InStorePickupFulfillmentRepository } from '@/persistence/repositories/in-store-pickup-fulfillment-repository';
import type { InStorePickupRepository } from '@/persistence/repositories/in-store-pickup-repository';
import type { LocationRepository } from '@/persistence/repositories/location-repository';
import type { OrderDiscountRepository } from '@/persistence/repositories/order-discount-repository';
import type { OrderLineRepository } from '@/persistence/repositories/order-line-repository';
import type { OrderRepository } from '@/persistence/repositories/order-repository';
import type { PaymentFailureRepository } from '@/persistence/repositories/payment-failure-repository';
import type { PaymentMethodRepository } from '@/persistence/repositories/payment-method-repository';
import type { PaymentRepository } from '@/persistence/repositories/payment-repository';
import { SortKey } from '@/persistence/repositories/repository';
import type { ShippingFulfillmentRepository } from '@/persistence/repositories/shipping-fulfillment-repository';
import type { ShippingMethodRepository } from '@/persistence/repositories/shipping-method-repository';
import type { StateRepository } from '@/persistence/repositories/state-repository';
import type { VariantRepository } from '@/persistence/repositories/variant-repository';
import { isValidEmail } from '@/utils/validators';

import { OrderDiscountApplication } from './discount-application/order-discount-application';
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
  PaymentFailedError,
  PaymentHandlerNotFound
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
  private readonly inStorePickupFulfillmentRepository: InStorePickupFulfillmentRepository;
  private readonly inStorePickupRepository: InStorePickupRepository;
  private readonly discountRepository: DiscountRepository;
  private readonly orderDiscountRepository: OrderDiscountRepository;
  private readonly locationRepository: LocationRepository;
  private readonly paymentRepository: PaymentRepository;
  private readonly paymentMethodRepository: PaymentMethodRepository;
  private readonly paymentFailureRepository: PaymentFailureRepository;
  private readonly discounts: OrderDiscountApplication;

  constructor(private readonly ctx: ExecutionContext) {
    this.validator = new OrderActionsValidator();
    this.discounts = new OrderDiscountApplication(ctx);

    this.repository = ctx.repositories.order;
    this.lineRepository = ctx.repositories.orderLine;
    this.variantRepository = ctx.repositories.variant;
    this.customerRepository = ctx.repositories.customer;
    this.countryRepository = ctx.repositories.country;
    this.stateRepository = ctx.repositories.state;
    this.shippingMethodRepository = ctx.repositories.shippingMethod;
    this.fulfillmentRepository = ctx.repositories.fulfillment;
    this.shippingFulfillmentRepository = ctx.repositories.shippingFulfillment;
    this.inStorePickupFulfillmentRepository = ctx.repositories.inStorePickupFulfillment;
    this.inStorePickupRepository = ctx.repositories.inStorePickup;
    this.discountRepository = ctx.repositories.discount;
    this.orderDiscountRepository = ctx.repositories.orderDiscount;
    this.locationRepository = ctx.repositories.location;
    this.paymentRepository = ctx.repositories.payment;
    this.paymentMethodRepository = ctx.repositories.paymentMethod;
    this.paymentFailureRepository = ctx.repositories.paymentFailure;
  }

  async find(input?: OrderListInput) {
    return this.repository.findByFilters(input ?? {});
  }

  async count(input?: OrderListInput['filters']) {
    return this.repository.countByFilters(input ?? {});
  }

  async findUnique({ id, code }: { id?: ID; code?: string }) {
    if (id) {
      return this.repository.findOne({ where: { id } });
    }

    if (code) {
      return this.repository.findOne({ where: { code } });
    }
  }

  async findAvailablePickupLocations() {
    return this.locationRepository.findEnabledAndAvailableForInStorePickup();
  }

  async findAvailablePaymentMethods() {
    return this.paymentMethodRepository.findMany({
      where: { enabled: true },
      orderBy: { createdAt: SortKey.Desc }
    });
  }

  async findAvailableShippingMethods(orderId: ID) {
    const order = await this.repository.findOneOrThrow({ where: { id: orderId } });
    const { shippingAddress } = order;

    if (!shippingAddress) return [];

    const country = await this.countryRepository.findOneOrThrow({
      where: { code: shippingAddress?.countryCode }
    });
    const state = await this.stateRepository.findOneOrThrow({
      where: { code: shippingAddress?.stateCode, countryId: country.id }
    });

    return await this.shippingMethodRepository.findEnabledByState(state.id);
  }

  async create(input: CreateOrderInput) {
    const { line } = input;

    if (!line || line.quantity <= 0) {
      return this.repository.create({
        subtotal: 0,
        total: 0,
        totalQuantity: 0,
        state: OrderState.Modifying,
        appliedDiscounts: []
      });
    }

    const variant = await this.variantRepository.findOneOrThrow({
      where: { id: line.productVariantId }
    });

    if (variant.stock < line.quantity) {
      return new NotEnoughStockError([variant.id]);
    }

    const unitPrice = variant.salePrice;
    const linePrice = unitPrice * line.quantity;

    const order = await this.repository.create({
      subtotal: linePrice,
      total: linePrice,
      totalQuantity: line.quantity,
      state: OrderState.Modifying,
      appliedDiscounts: []
    });

    await this.lineRepository.create({
      orderId: order.id,
      variantId: variant.id,
      quantity: line.quantity,
      unitPrice,
      lineSubtotal: linePrice,
      lineTotal: linePrice,
      appliedDiscounts: []
    });

    return this.discounts.applyAvailable(order);
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

      return this.discounts.applyAvailable(orderUpdated);
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

    return this.discounts.applyAvailable(orderUpdated);
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

      return this.discounts.applyAvailable(orderUpdated);
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

    return this.discounts.applyAvailable(orderUpdated);
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

    return this.discounts.applyAvailable(orderUpdated);
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

    return await this.discounts.applyAvailable(orderUpdated);
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

    return this.discounts.applyAvailable(orderUpdated);
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

    if (orderFulfillment) {
      if (orderFulfillment.type === FulfillmentType.IN_STORE_PICKUP) {
        await this.inStorePickupFulfillmentRepository.remove({
          where: { fulfillmentId: orderFulfillment.id }
        });
      }
    }

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
        total: shippingPrice,
        type: FulfillmentType.SHIPPING
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

    return this.discounts.applyAvailable(orderUpdated);
  }

  async addInStorePickupFulfillment(orderId: ID, input: AddInStorePickupFulfillmentInput) {
    const order = await this.repository.findOneOrThrow({ where: { id: orderId } });

    if (!this.validator.canAddInStorePickupFulfillment(order.state)) {
      return new ForbiddenOrderActionError(order.state);
    }

    const location = await this.locationRepository.findOneOrThrow({
      where: { id: input.locationId }
    });

    const [country, state] = await Promise.all([
      this.countryRepository.findOneOrThrow({ where: { id: location.countryId } }),
      this.stateRepository.findOneOrThrow({ where: { id: location.stateId } })
    ]);

    const orderFulfillment = await this.fulfillmentRepository.findOne({ where: { orderId } });

    if (orderFulfillment) {
      if (orderFulfillment.type === FulfillmentType.SHIPPING) {
        await this.shippingFulfillmentRepository.remove({
          where: { fulfillmentId: orderFulfillment.id }
        });
      }
    }

    const fulfillment = await this.fulfillmentRepository.upsert({
      where: { id: orderFulfillment?.id },
      create: {
        orderId,
        amount: 0,
        total: 0,
        type: FulfillmentType.IN_STORE_PICKUP
      },
      update: {
        amount: 0,
        total: 0,
        type: FulfillmentType.IN_STORE_PICKUP
      }
    });

    await this.inStorePickupFulfillmentRepository.upsert({
      where: { fulfillmentId: orderFulfillment?.id },
      create: {
        fulfillmentId: fulfillment.id,
        locationId: input.locationId,
        address: {
          name: location.name,
          streetLine1: location.streetLine1,
          streetLine2: location.streetLine2,
          city: location.city,
          postalCode: location.postalCode,
          phoneNumber: location.phoneNumber,
          references: location.references,
          country: country.name,
          countryCode: country.code,
          state: state.name,
          stateCode: state.code
        }
      },
      update: {
        locationId: input.locationId,
        address: {
          name: location.name,
          streetLine1: location.streetLine1,
          streetLine2: location.streetLine2,
          city: location.city,
          postalCode: location.postalCode,
          phoneNumber: location.phoneNumber,
          references: location.references,
          country: country.name,
          countryCode: country.code,
          state: state.name,
          stateCode: state.code
        }
      }
    });

    const orderUpdated = await this.repository.update({
      where: { id: orderId },
      data: {
        total: order.total - (orderFulfillment?.total ?? 0)
      }
    });

    return this.discounts.applyAvailable(orderUpdated);
  }

  async addDiscountCode(orderId: ID, code: string) {
    await this.discounts.clean(orderId);

    const order = await this.repository.findOneOrThrow({ where: { id: orderId } });

    if (!this.validator.canModifyDiscounts(order.state)) {
      return new ForbiddenOrderActionError(order.state);
    }

    const discount = await this.discountRepository.findOne({ where: { code } });

    if (!discount) return new DiscountCodeNotApplicable();

    const isValid = await this.discounts.isValid(discount, order);

    if (!isValid) return new DiscountCodeNotApplicable();

    const handler = getConfig().discounts.handlers.find(h => h.code === discount.handler.code);

    if (!handler) return new DiscountHandlerNotFound();

    return await this.discounts.apply(order, discount, handler);
  }

  async addPayment(orderId: ID, input: AddPaymentToOrderInput) {
    const currentOrder = await this.repository.findOneOrThrow({ where: { id: orderId } });

    const order = await this.discounts.applyAvailable(currentOrder);

    const fulfillment = await this.fulfillmentRepository.findOne({
      where: { orderId: order.id },
      fields: ['id']
    });

    if (!this.validator.canAddPayment(order, fulfillment?.id)) {
      return new ForbiddenOrderActionError(order.state);
    }

    const paymentMethod = await this.paymentMethodRepository.findOneOrThrow({
      where: { id: input.methodId, enabled: true }
    });

    const handler = getConfig().payments.handlers.find(h => h.code === paymentMethod.handler.code);

    if (!handler) {
      return new PaymentHandlerNotFound();
    }

    const orderLines = await this.lineRepository.findMany({ where: { orderId } });

    const variants = await Promise.all(
      orderLines.map(line =>
        this.variantRepository.findOneOrThrow({ where: { id: line.variantId } })
      )
    );

    const variantsWithNotEnoughStock = orderLines.filter(line => {
      const variant = variants.find(v => v.id === line.variantId);

      if (!variant) return false;

      return variant.stock < line.quantity;
    });

    if (variantsWithNotEnoughStock.length > 0) {
      return new NotEnoughStockError(variantsWithNotEnoughStock.map(v => v.id));
    }

    const paymentResult = await handler.createPayment(
      order,
      order.total,
      paymentMethod.handler.args,
      this.ctx
    );

    if (paymentResult.status === PaymentState.Failed) {
      const payment = await this.paymentRepository.create({
        orderId,
        amount: order.total,
        method: paymentMethod.name,
        state: paymentResult.status,
        paymentMethodId: paymentMethod.id
      });

      await this.paymentFailureRepository.create({
        paymentId: payment.id,
        reason: paymentResult.reason
      });

      // TODO: i don't think this is a good idea, should have internal reason a a public error
      return new PaymentFailedError(paymentResult.reason);
    }

    await Promise.all(
      orderLines.map(line => {
        const variant = variants.find(v => v.id === line.variantId);

        if (!variant) return null;

        this.variantRepository.update({
          where: { id: variant.id },
          data: {
            stock: variant.stock - line.quantity
          }
        });
      })
    );

    await this.paymentRepository.create({
      orderId,
      transactionId:
        paymentResult.status === PaymentState.Captured ? paymentResult.transactionId : null,
      amount: paymentResult.amount,
      method: paymentMethod.name,
      state: paymentResult.status,
      paymentMethodId: paymentMethod.id
    });

    const orderCodeStrategy = getConfig().orders.codeStrategy;
    const orderCode = await orderCodeStrategy.generate(order, this.ctx);

    const orderUpdated = await this.repository.update({
      where: { id: orderId },
      data: {
        state: OrderState.Placed,
        code: orderCode,
        placedAt: new Date()
      }
    });

    return orderUpdated;
  }
}
