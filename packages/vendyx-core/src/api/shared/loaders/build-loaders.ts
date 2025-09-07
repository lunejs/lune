import { createProductLocalizationLoader } from '@/api/storefront/loaders/product-localization.loader';
import { Transaction } from '@/persistence/connection';
import { Locale } from '@/persistence/entities/locale';

import { createProductAssetsLoader } from './product-asset.loader';
import { createProductTagsLoader } from './product-tags.loader';
import { createProductTranslationsLoader } from './product-translations.loader';

export const buildLoaders = (trx: Transaction, locale: Locale | null | undefined) => {
  return {
    product: {
      localization: createProductLocalizationLoader(trx, locale),
      translation: createProductTranslationsLoader(trx),
      assets: createProductAssetsLoader(trx),
      tags: createProductTagsLoader(trx)
    }
  };
};

export type Loaders = ReturnType<typeof buildLoaders>;
