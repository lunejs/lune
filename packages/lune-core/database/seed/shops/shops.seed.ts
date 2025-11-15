import type { Knex } from 'knex';

import { LuneLogger } from '@/logger/lune.logger';
import { Tables } from '@/persistence/tables';
import type { ShopTable } from '@/persistence/entities/shop';
import { ApiKey } from '@/security/api-key/api-key';

import Shops from './shops.json';
import { SeedContext } from '../seed.types';

export async function seedShops(trx: Knex.Transaction, ctx: SeedContext) {
  for (const shop of Shops) {
    const storefrontApiKey = ApiKey.generate();

    await trx<ShopTable>(Tables.Shop).insert({
      name: shop.name,
      slug: shop.slug,
      storefront_api_key: storefrontApiKey,
      email: shop.email,
      phone_number: shop.phoneNumber,
      logo: shop.logo,
      storefront_url: shop.storefrontUrl,
      socials: shop.socials,
      owner_id: ctx.userId
    });
  }

  LuneLogger.info(`Shops inserted: ${Shops.length}`);
}
