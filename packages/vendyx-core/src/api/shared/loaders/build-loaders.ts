import { createProductLocalizationLoader } from '@/api/storefront/loaders/product-localization.loader';
import type { Transaction } from '@/persistence/connection';
import type { Locale } from '@/persistence/entities/locale';

import { createProductAssetsLoader } from './product-asset.loader';
import { createProductTagsLoader } from './product-tags.loader';
import { createProductTranslationsLoader } from './product-translations.loader';
import { createVariantAssetsLoader } from './variant-assets.loader';

export const buildLoaders = (trx: Transaction, locale: Locale | null | undefined) => {
  return {
    product: {
      localization: createProductLocalizationLoader(trx, locale),
      translation: createProductTranslationsLoader(trx),
      assets: createProductAssetsLoader(trx),
      tags: createProductTagsLoader(trx)
    },
    variant: {
      assets: createVariantAssetsLoader(trx)
    }
  };
};

export type Loaders = ReturnType<typeof buildLoaders>;
