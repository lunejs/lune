import type { Transaction } from './connection/connection';

/**
 * @description
 * Runs a function in a context where Row Level Security (RLS) is disabled.
 * This is useful for operations that need to bypass RLS checks,
 * such as administrative tasks, global database unique constraints validations, etc.
 *
 * After the function execution, RLS is re-enabled to restore the original context.
 *
 * @example
 * ```ts
 * const result = await runWithoutRLS(ctx, async () => {
 *   // Perform operations that require RLS to be disabled
 *   return await someRepository.findAll();
 * });
 *
 * // result will contain the data fetched without RLS restrictions
 * ```
 */
export const runWithoutRLS =
  (trx: Transaction, shopId: string | null, ownerId: string | null) =>
  async <T>(fn: () => Promise<T>): Promise<T> => {
    await disableRLS(trx);

    try {
      return await fn();
    } finally {
      await enableRLS({ trx, shopId, ownerId });
    }
  };

async function disableRLS(trx: Transaction) {
  await trx.raw(`
    SELECT set_config('app.current_shop_id', '${UUID_PLACEHOLDER}', TRUE)
  `);
  await trx.raw(`
    SELECT set_config('app.current_owner_id', '${UUID_PLACEHOLDER}', TRUE)
  `);
  await trx.raw(`
    SELECT set_config('app.bypass_rls', 'on', TRUE)
  `);
}

export async function enableRLS({
  trx,
  shopId,
  ownerId
}: {
  trx: Transaction;
  shopId: string | null;
  ownerId: string | null;
}) {
  await trx.raw(`SELECT set_config('app.current_shop_id', '${shopId || UUID_PLACEHOLDER}', TRUE)`);
  await trx.raw(
    `SELECT set_config('app.current_owner_id', '${ownerId || UUID_PLACEHOLDER}', TRUE)`
  );
}

/**
 * This is a workaround to always have a valid uuid in the current_shop_id and current_owner_id since the empty string is not a valid UUID
 * The empty string occurs when this flow happens:
 *
 * 1. There is no user in session and for that there is no a owner_id in the JWT token (queries without UseUserGuard)
 * 2. There is no a shop in session (for queries like createStore)
 *
 * And for this reason, we are setting the current_shop_id and current_owner_id to a valid but dummy UUID in the PrismaForAdmin queries
 */
const UUID_PLACEHOLDER = '00000000-0000-0000-0000-000000000000';
