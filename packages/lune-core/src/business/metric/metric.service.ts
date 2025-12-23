import type { ExecutionContext } from '@/api/shared/context/types';
import type { Metric, MetricInput, MetricResult } from '@/api/shared/types/graphql';
import { OrderState } from '@/persistence/entities/order';
import { Tables } from '@/persistence/tables';

export class MetricService {
  constructor(private readonly ctx: ExecutionContext) {}

  async getTotalSales(input: MetricInput): Promise<MetricResult> {
    const { startsAt, endsAt } = input;

    const rows = await this.ctx.trx.raw(
      `
      SELECT
        to_char(d.date, 'YYYY-MM-DD') as key,
        COALESCE(SUM(o.total), 0) as value
      FROM generate_series(?::date, ?::date, '1 day'::interval) AS d(date)
      LEFT JOIN "${Tables.Order}" o
        ON to_char(o.placed_at, 'YYYY-MM-DD') = to_char(d.date, 'YYYY-MM-DD')
        AND o.placed_at IS NOT NULL
        AND o.state NOT IN (?, ?)
      GROUP BY d.date
      ORDER BY d.date ASC
      `,
      [startsAt, endsAt, OrderState.Modifying, OrderState.Canceled]
    );

    const metrics: Metric[] = rows.rows.map((row: { key: string; value: string }) => ({
      key: row.key,
      value: Number(row.value)
    }));

    const total = metrics.reduce((acc, m) => acc + m.value, 0);

    return { metrics, total };
  }

  async getTotalOrders(input: MetricInput): Promise<MetricResult> {
    const { startsAt, endsAt } = input;

    const rows = await this.ctx.trx.raw(
      `
      SELECT
        to_char(d.date, 'YYYY-MM-DD') as key,
        COUNT(o.id) as value
      FROM generate_series(?::date, ?::date, '1 day'::interval) AS d(date)
      LEFT JOIN "${Tables.Order}" o
        ON to_char(o.placed_at, 'YYYY-MM-DD') = to_char(d.date, 'YYYY-MM-DD')
        AND o.placed_at IS NOT NULL
        AND o.state NOT IN (?, ?)
      GROUP BY d.date
      ORDER BY d.date ASC
      `,
      [startsAt, endsAt, OrderState.Modifying, OrderState.Canceled]
    );

    const metrics: Metric[] = rows.rows.map((row: { key: string; value: string }) => ({
      key: row.key,
      value: Number(row.value)
    }));

    const total = metrics.reduce((acc, m) => acc + m.value, 0);

    return { metrics, total };
  }
}
