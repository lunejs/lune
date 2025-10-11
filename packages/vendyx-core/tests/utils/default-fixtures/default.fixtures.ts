import { Tables } from '@/persistence/tables';

import { DefaultAssetFixture } from './asset.fixture';
import { DefaultOptionFixture } from './option.fixture';
import { DefaultOptionValueFixture } from './option-value.fixture';
import { DefaultProductFixture } from './product.fixture';
import { DefaultProductAssetFixture } from './product-asset.fixture';
import { DefaultProductOptionFixture } from './product-option.fixture';
import { DefaultProductTagFixture } from './product-tag.fixture';
import { DefaultProductTranslationFixture } from './product-translation.fixture';
import { DefaultShopFixture } from './shop.fixture';
import { DefaultTagFixture } from './tag.fixture';
import { DefaultUserFixture } from './user.fixture';
import { DefaultVariantFixture } from './variant.fixture';
import { DefaultVariantAssetFixture } from './variant-asset.fixture';
import { DefaultVariantOptionValueFixture } from './variant-option-value.fixture';

export const FixtureDefaults: Record<Tables, () => unknown> = {
  [Tables.Users]: DefaultUserFixture,
  [Tables.Shop]: DefaultShopFixture,
  [Tables.Product]: DefaultProductFixture,
  [Tables.Tag]: DefaultTagFixture,
  [Tables.ProductTag]: DefaultProductTagFixture,
  [Tables.Variant]: DefaultVariantFixture,
  [Tables.Option]: DefaultOptionFixture,
  [Tables.OptionValue]: DefaultOptionValueFixture,
  [Tables.VariantOptionValue]: DefaultVariantOptionValueFixture,
  [Tables.Asset]: DefaultAssetFixture,
  [Tables.ProductAsset]: DefaultProductAssetFixture,
  [Tables.ProductTranslation]: DefaultProductTranslationFixture,
  [Tables.ProductOption]: DefaultProductOptionFixture,
  [Tables.VariantAsset]: DefaultVariantAssetFixture
};
