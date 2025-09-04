import { Transaction } from '../connection';

import { AssetRepository } from './asset-repository/asset.repository';
import { ProductRepository } from './product-repository';
import { ShopRepository } from './shop-repository';
import { UserRepository } from './user-repository';

export function buildRepositories(trx: Transaction) {
  return {
    user: new UserRepository(trx),
    shop: new ShopRepository(trx),
    product: new ProductRepository(trx),
    asset: new AssetRepository(trx)
  };
}

export type Repositories = ReturnType<typeof buildRepositories>;
