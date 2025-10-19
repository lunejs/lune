import { createProductLocalizationLoader } from '@/api/storefront/loaders/product-localization.loader';
import type { Transaction } from '@/persistence/connection';
import type { Locale } from '@/persistence/entities/locale';

import { createOptionTranslationsLoader } from './option-translations.loader';
import { createOptionValuesLoader } from './option-values.loader';
import { createOptionValuesTranslationsLoader } from './option-values-translations.loader';
import { createProductAssetsLoader } from './product-asset.loader';
import { createProductOptionsLoader } from './product-options.loader';
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
      variants: createVariantsLoader(trx),
      options: createProductOptionsLoader(trx)
    },
    variant: {
      assets: createVariantAssetsLoader(trx),
      optionValues: createVariantOptionValuesLoader(trx)
    },
    option: {
      values: createOptionValuesLoader(trx),
      translations: createOptionTranslationsLoader(trx)
    },
    optionValues: {
      translations: createOptionValuesTranslationsLoader(trx)
    }
  };
};

export type Loaders = ReturnType<typeof buildLoaders>;
