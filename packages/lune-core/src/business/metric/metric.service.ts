import type { ExecutionContext } from '@/api/shared/context/types';
import type { Metric, MetricsInput, MetricsResult } from '@/api/shared/types/graphql';
import { OrderState } from '@/persistence/entities/order';
import { Tables } from '@/persistence/tables';

export class MetricService {
  constructor(private readonly ctx: ExecutionContext) {}

  async getTotalSales(input: MetricsInput): Promise<MetricsResult> {
    const { startsAt, endsAt } = input;

    const rows = await this.ctx
      .trx(Tables.Order)
      .select(this.ctx.trx.raw('DATE(placed_at) as key'))
      .sum('total as value')
      .whereNotNull('placed_at')
      .whereNot('state', OrderState.Modifying)
      .whereNot('state', OrderState.Canceled)
      .whereBetween('placed_at', [startsAt, endsAt])
      .groupByRaw('DATE(placed_at)')
      .orderByRaw('DATE(placed_at) ASC');

    const metrics: Metric[] = rows.map(row => ({
      key: row.key,
      value: Number(row.value)
    }));

    const total = metrics.reduce((acc, m) => acc + m.value, 0);

    return { metrics, total };
  }
}
