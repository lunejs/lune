import { createProductLocalizationLoader } from '@/api/storefront/loaders/product-localization.loader';
import type { Transaction } from '@/persistence/connection';
import type { Locale } from '@/persistence/entities/locale';

import { createOptionValuesLoader } from './option-values.loader';
import { createProductAssetsLoader } from './product-asset.loader';
import { createProductTagsLoader } from './product-tags.loader';
import { createProductTranslationsLoader } from './product-translations.loader';
import { createVariantAssetsLoader } from './variant-assets.loader';
import { createVariantOptionValuesLoader } from './variant-option-values.loader';
import { createVariantsLoader } from './variants.loader';

export const buildLoaders = (trx: Transaction, locale: Locale | null | undefined) => {
  return {
    product: {
      localization: createProductLocalizationLoader(trx, locale),
      translation: createProductTranslationsLoader(trx),
      assets: createProductAssetsLoader(trx),
      tags: createProductTagsLoader(trx),
      variants: createVariantsLoader(trx)
    },
    variant: {
      assets: createVariantAssetsLoader(trx),
      optionValues: createVariantOptionValuesLoader(trx)
    },
    option: {
      values: createOptionValuesLoader(trx)
    }
  };
};

export type Loaders = ReturnType<typeof buildLoaders>;
