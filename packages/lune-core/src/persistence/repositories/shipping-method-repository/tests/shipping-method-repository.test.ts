import type { Transaction } from '@/persistence/connection/connection';
import { TestUtils } from '@/tests/utils/test-utils';

import { ShippingMethodRepository } from '../shipping-method.repository';

import { CountryFixtures } from './fixtures/country.fixtures';
import {
  ShippingMethodConstants,
  ShippingMethodFixtures
} from './fixtures/shipping-method.fixtures';
import { ShopFixtures } from './fixtures/shop.fixtures';
import { StateConstants, StateFixtures } from './fixtures/state.fixtures';
import { UserFixtures } from './fixtures/user.fixtures';
import { ZoneFixtures } from './fixtures/zone.fixtures';
import { ZoneStateFixtures } from './fixtures/zone-state.fixtures';

describe('ShippingMethod repository', () => {
  const testHelper = new TestUtils();

  let repository: ShippingMethodRepository;
  let trx: Transaction;

  beforeEach(async () => {
    trx = await testHelper.generateTrx();
    repository = new ShippingMethodRepository(trx);

    await testHelper.loadFixtures([
      new UserFixtures(),
      new ShopFixtures(),
      new CountryFixtures(),
      new StateFixtures(),
      new ZoneFixtures(),
      new ZoneStateFixtures(),
      new ShippingMethodFixtures()
    ]);
  });

  afterEach(async () => {
    await testHelper.resetDatabase();
  });

  afterAll(async () => {
    await testHelper.destroyDatabase();
  });

  describe('findEnabledByIdAndState', () => {
    test('returns method when available in state', async () => {
      const method = await repository.findEnabledByIdAndState(
        ShippingMethodConstants.StandardLocalID,
        StateConstants.MxSinaloaID
      );

      expect(method?.id).toBe(ShippingMethodConstants.StandardLocalID);
    });

    test('does not return method when is not enabled', async () => {
      const method = await repository.findEnabledByIdAndState(
        ShippingMethodConstants.DisabledLocalID,
        StateConstants.MxSinaloaID
      );

      expect(method).toBeNull();
    });

    test('does not return method when is not in the provided state', async () => {
      const method = await repository.findEnabledByIdAndState(
        ShippingMethodConstants.ExpressLocalID,
        StateConstants.MxGuerreroID
      );

      expect(method).toBeNull();
    });
  });
});
