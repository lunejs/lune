import type { Fulfillment } from '@/persistence/entities/fulfillment';
import type { FulfillmentLine } from '@/persistence/entities/fulfillment-line';

import type { ExecutionContext } from '../context/types';
import { ListResponse } from '../utils/list-response';

export const CommonFulfillmentFieldResolver = {
  lines: async (parent: Fulfillment, _: unknown, ctx: ExecutionContext) => {
    const lines = await ctx.loaders.fulfillment.lines.load(parent.id);

    return new ListResponse(lines, lines.length, { total: lines.length });
  }
};

export const CommonFulfillmentLineFieldResolver = {
  orderLine: async (parent: FulfillmentLine, _: unknown, ctx: ExecutionContext) => {
    return ctx.loaders.fulfillmentLine.orderLine.load(parent.orderLineId);
  }
};
