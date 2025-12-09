import { isTruthy } from '@lune/common';

import type { ExecutionContext } from '@/api/shared/context/types';
import { getConfig } from '@/config/config';
import type { FulfillmentDiscountHandler } from '@/config/discounts/fulfillment-discount-handler';
import type { OrderDiscountHandler } from '@/config/discounts/order-discount-handler';
import type { OrderLineDiscountHandler } from '@/config/discounts/order-line-discount-handler';
import type { AppliedDiscount, Discount } from '@/persistence/entities/discount';
import { ApplicationLevel, ApplicationMode } from '@/persistence/entities/discount';
import type { ID } from '@/persistence/entities/entity';
import type { Order } from '@/persistence/entities/order';
import type { DiscountRepository } from '@/persistence/repositories/discount-repository';
import type { FulfillmentRepository } from '@/persistence/repositories/fulfillment-repository';
import type { OrderDiscountRepository } from '@/persistence/repositories/order-discount-repository';
import type { OrderLineRepository } from '@/persistence/repositories/order-line-repository';
import type { OrderRepository } from '@/persistence/repositories/order-repository';

import { DiscountCodeNotApplicable, OrderErrorResult } from '../order.errors';

export class OrderDiscountApplication {
  private readonly repository: OrderRepository;
  private readonly lineRepository: OrderLineRepository;
  private readonly fulfillmentRepository: FulfillmentRepository;
  private readonly discountRepository: DiscountRepository;
  private readonly orderDiscountRepository: OrderDiscountRepository;

  constructor(private readonly ctx: ExecutionContext) {
    this.repository = ctx.repositories.order;
    this.lineRepository = ctx.repositories.orderLine;
    this.fulfillmentRepository = ctx.repositories.fulfillment;
    this.discountRepository = ctx.repositories.discount;
    this.orderDiscountRepository = ctx.repositories.orderDiscount;
  }

  async applyAvailable(order: Order) {
    const alreadyInOrderDiscountCodes = await this.getAlreadyInOrderDiscountCodes(order);

    const automaticDiscounts = await this.discountRepository.findMany({
      where: { applicationMode: ApplicationMode.Automatic }
    });

    const discounts = [...alreadyInOrderDiscountCodes, ...automaticDiscounts];

    if (!discounts.length) return order;

    await this.clean(order.id);

    order = await this.repository.findOneOrThrow({ where: { id: order.id } });

    const applicableDiscounts: ApplicableDiscount[] = [];

    for (const discount of discounts) {
      const isValid = await this.isValid(discount, order);

      if (!isValid) continue;

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

    const bestDiscountsFirst = applicableDiscounts.sort(
      (a, b) => b.discountedAmount - a.discountedAmount
    );

    const [{ discount: bestAutomaticDiscount }] = bestDiscountsFirst;
    const bestDiscountCode = bestDiscountsFirst.find(
      d => d.discount.applicationMode === ApplicationMode.Code
    )?.discount;

    const discount = bestDiscountCode ?? bestAutomaticDiscount;

    const handler = getConfig().discounts.handlers.find(h => h.code === discount.handler.code);

    // we should return an error? no but what to do when there is no handler?
    if (!handler) return order;

    const result = await this.apply(order, discount, handler);

    if (result instanceof OrderErrorResult) return order;

    return result;
  }

  async apply(
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

      let atLeastOneApplied = false;

      for (const line of orderLines) {
        const canApply = await discountHandler.check(this.ctx, order, line, discount.handler.args);

        if (!canApply) continue;

        atLeastOneApplied = true;

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

      if (!atLeastOneApplied) return new DiscountCodeNotApplicable();

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

    // TODO: add warn log for when application level does not match
    return order;
  }

  async isValid(discount: Discount, order: Order) {
    if (!discount?.enabled) return false;

    const hasFinished = discount.endsAt ? discount.endsAt < new Date() : false;
    const hasStarted = discount.startsAt <= new Date();
    const isActive = hasStarted && !hasFinished;

    if (!isActive) return false;

    if (order.customerId && discount.perCustomerLimit) {
      const usages = await this.orderDiscountRepository.countByCustomerIdAndDiscountId(
        order.customerId,
        discount.id
      );

      if (usages >= discount.perCustomerLimit) return false;
    }

    return true;
  }

  async clean(orderId: ID) {
    const [lines, fulfillment] = await Promise.all([
      this.lineRepository.findMany({ where: { orderId } }),
      this.fulfillmentRepository.findOne({ where: { orderId } })
    ]);

    await Promise.all(
      lines.map(line =>
        this.lineRepository.update({
          where: { id: line.id },
          data: {
            lineTotal: line.lineSubtotal,
            appliedDiscounts: []
          }
        })
      )
    );

    const newSubtotal = lines.reduce((acc, line) => acc + line.lineSubtotal, 0);

    let fulfillmentTotal = 0;

    if (fulfillment) {
      await this.fulfillmentRepository.update({
        where: { id: fulfillment.id },
        data: { total: fulfillment.amount }
      });

      fulfillmentTotal = fulfillment.amount;
    }

    return await this.repository.update({
      where: { id: orderId },
      data: {
        subtotal: newSubtotal,
        total: newSubtotal + fulfillmentTotal,
        appliedDiscounts: []
      }
    });
  }

  private async getAlreadyInOrderDiscountCodes(order: Order) {
    const lines = await this.lineRepository.findMany({ where: { orderId: order.id } });

    const orderLevel: AppliedDiscount[] = order.appliedDiscounts.filter(
      d => d.applicationMode === ApplicationMode.Code
    );
    const orderLineLevel: AppliedDiscount[] = lines
      .flatMap(l => l.appliedDiscounts.find(d => d.applicationMode === ApplicationMode.Code))
      .filter(isTruthy);

    const discounts = await this.discountRepository.findManyByCodes(
      [...orderLevel, ...orderLineLevel].map(d => d.code)
    );

    return discounts;
  }
}

type ApplicableDiscount = {
  discount: Discount;
  discountedAmount: number;
};
