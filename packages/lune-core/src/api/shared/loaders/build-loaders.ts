import { createOptionLocalizationLoader } from '@/api/storefront/loaders/option-localization.loader';
import { createOptionValueLocalizationLoader } from '@/api/storefront/loaders/option-value-localization.loader copy';
import { createProductLocalizationLoader } from '@/api/storefront/loaders/product-localization.loader';
import type { Transaction } from '@/persistence/connection';
import type { Locale } from '@/persistence/entities/locale';

import { createCollectionAssetsLoader } from './collection/collection-asset.loader';
import { createCollectionSubCollectionsLoader } from './collection/collection-asset.loader copy';
import { createCollectionProductsLoader } from './collection/collection-product.loader';
import { createOptionTranslationsLoader } from './option/option-translations.loader';
import { createOptionValuesLoader } from './option-value/option-values.loader';
import { createOptionValuesTranslationsLoader } from './option-value/option-values-translations.loader';
import { createProductAssetsLoader } from './product/product-asset.loader';
import { createProductOptionsLoader } from './product/product-options.loader';
import { createProductTagsLoader } from './product/product-tags.loader';
import { createProductTranslationsLoader } from './product/product-translations.loader';
import { createVariantAssetsLoader } from './variant/variant-assets.loader';
import { createVariantOptionValuesLoader } from './variant/variant-option-values.loader';
import { createVariantsLoader } from './variant/variants.loader';

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
      localization: createOptionLocalizationLoader(trx, locale),
      values: createOptionValuesLoader(trx),
      translations: createOptionTranslationsLoader(trx)
    },
    optionValues: {
      localization: createOptionValueLocalizationLoader(trx, locale),
      translations: createOptionValuesTranslationsLoader(trx)
    },
    collections: {
      assets: createCollectionAssetsLoader(trx),
      products: createCollectionProductsLoader(trx),
      subCollections: createCollectionSubCollectionsLoader(trx)
    }
  };
};

export type Loaders = ReturnType<typeof buildLoaders>;
