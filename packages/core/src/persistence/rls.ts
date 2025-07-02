import { GraphqlContext } from '@/api/shared/context/types';

export async function disableRLS({ trx }: GraphqlContext) {
  await trx.raw(`
    SELECT set_config('app.current_shop_id', '00000000-0000-0000-0000-000000000000', TRUE)
  `);
  await trx.raw(`
    SELECT set_config('app.current_owner_id', '00000000-0000-0000-0000-000000000000', TRUE)
  `);
  await trx.raw(`
    SELECT set_config('app.bypass_rls', 'on', TRUE)
  `);
}

export async function enableRLS({ trx, shopId }: GraphqlContext) {
  await trx.raw(`SELECT set_config('app.current_shop_id', '${shopId}', TRUE)`);
}
