import { Tables } from '@/persistence/tables';
import { DefaultUserFixture } from './user.fixture';
import { DefaultShopFixture } from './shop.fixture';

export const FixtureDefaults: Record<Tables, () => unknown> = {
  [Tables.Users]: DefaultUserFixture,
  [Tables.Shop]: DefaultShopFixture
};
