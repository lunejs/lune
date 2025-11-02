import type { Transaction } from '../connection';

import { AssetRepository } from './asset-repository';
import { CollectionRepository } from './collection-repository';
import { CollectionTranslationRepository } from './collection-translation-repository';
import { CountryRepository } from './country-repository';
import { CustomerRepository } from './customer-repository';
import { OptionRepository } from './option-repository';
import { OptionTranslationRepository } from './option-translation-repository';
import { OptionValueRepository } from './option-value-repository';
import { OptionValueTranslationRepository } from './option-value-translation-repository';
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
    optionValue: new OptionValueRepository(trx),
    optionTranslation: new OptionTranslationRepository(trx),
    optionValueTranslation: new OptionValueTranslationRepository(trx),
    collection: new CollectionRepository(trx),
    collectionTranslation: new CollectionTranslationRepository(trx),
    customer: new CustomerRepository(trx),
    country: new CountryRepository(trx)
  };
}

export type Repositories = ReturnType<typeof buildRepositories>;
