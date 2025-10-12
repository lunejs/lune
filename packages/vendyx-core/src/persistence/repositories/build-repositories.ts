import type { Transaction } from '../connection';

import { AssetRepository } from './asset-repository/asset.repository';
import { OptionRepository } from './option-repository/option.repository';
import { OptionValueRepository } from './option-value-repository/option-value.repository';
import { ProductRepository } from './product-repository';
import { ProductTranslationRepository } from './product-translation-repository';
import { ShopRepository } from './shop-repository';
import { UserRepository } from './user-repository';
import { VariantRepository } from './variant-repository';

export function buildRepositories(trx: Transaction) {
  return {
    user: new UserRepository(trx),
    shop: new ShopRepository(trx),
    product: new ProductRepository(trx),
    asset: new AssetRepository(trx),
    variant: new VariantRepository(trx),
    productTranslation: new ProductTranslationRepository(trx),
    option: new OptionRepository(trx),
    optionValue: new OptionValueRepository(trx)
  };
}

export type Repositories = ReturnType<typeof buildRepositories>;
