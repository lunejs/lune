import type { ExecutionContext } from '@/api/shared/context/types';
import type { GraphqlApiResolver } from '@/api/shared/graphql-api';
import { UseUserGuard } from '@/api/shared/guards/user.guard';
import type { QueryTotalSalesArgs } from '@/api/shared/types/graphql';
import { MetricService } from '@/business/metric/metric.service';

async function totalSales(_, { input }: QueryTotalSalesArgs, ctx: ExecutionContext) {
  const metricService = new MetricService(ctx);

  return metricService.getTotalSales(input);
}

export const MetricResolver: GraphqlApiResolver = {
  Query: {
    totalSales: UseUserGuard(totalSales)
  }
};
