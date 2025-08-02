import { Transaction } from '../connection';
import { ShopRepository } from './shop-repository';
import { UserRepository } from './user-repository';

export function buildRepositories(trx: Transaction) {
  return {
    user: new UserRepository(trx),
    shop: new ShopRepository(trx)
    // product: new ProductRepository(trx)
  };
}

export type Repositories = ReturnType<typeof buildRepositories>;
