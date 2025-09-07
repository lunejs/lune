import { createProductTranslationLoader } from '@/api/storefront/loaders/product-translation.loader';
import { Transaction } from '@/persistence/connection';
import { Locale } from '@/persistence/entities/locale';

import { createProductAssetsLoader } from './product-asset.loader';
import { createProductTagsLoader } from './product-tags.loader';

export const buildLoaders = (trx: Transaction, locale: Locale | null | undefined) => {
  return {
    product: {
      translation: createProductTranslationLoader(trx, locale),
      assets: createProductAssetsLoader(trx),
      tags: createProductTagsLoader(trx)
    }
  };
};

export type Loaders = ReturnType<typeof buildLoaders>;
