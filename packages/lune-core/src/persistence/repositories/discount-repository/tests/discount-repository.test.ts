import type { Transaction } from '@/persistence/connection/connection';
import { TestUtils } from '@/tests/utils/test-utils';

import { DiscountRepository } from '../discount.repository';

import { DiscountConstants, DiscountFixtures } from './fixtures/discount.fixtures';
import { ShopFixtures } from './fixtures/shop.fixtures';
import { UserFixtures } from './fixtures/user.fixtures';

describe('Discount repository', () => {
  const testHelper = new TestUtils();

  let repository: DiscountRepository;
  let trx: Transaction;

  beforeEach(async () => {
    trx = await testHelper.generateTrx();
    repository = new DiscountRepository(trx);

    await testHelper.loadFixtures([new UserFixtures(), new ShopFixtures(), new DiscountFixtures()]);
  });

  afterEach(async () => {
    await testHelper.resetDatabase();
  });

  afterAll(async () => {
    await testHelper.destroyDatabase();
  });

  describe('findByFilters & countByFilters', () => {
    test('returns discounts matching code filter (contains)', async () => {
      const filters = { code: { contains: 'SUMMER' } };

      const result = await repository.findByFilters({ filters });

      expect(result.map(d => d.code).every(code => code.includes('SUMMER'))).toBe(true);
      expect(result.length).toBe(await repository.countByFilters(filters));
    });

    test('returns discounts matching code filter (contains case insensitive)', async () => {
      const filters = { code: { contains: 'summer' } };

      const result = await repository.findByFilters({ filters });

      expect(result.map(d => d.code).every(code => code.toLowerCase().includes('summer'))).toBe(
        true
      );
      expect(result.length).toBe(1);
      expect(result.length).toBe(await repository.countByFilters(filters));
    });

    test('returns discounts matching code filter (equals)', async () => {
      const filters = { code: { equals: 'SUMMER2024' } };
      const result = await repository.findByFilters({ filters });

      expect(result[0].code).toBe('SUMMER2024');
      expect(result.length).toBe(1);
      expect(result.length).toBe(await repository.countByFilters(filters));
    });

    test('returns discounts matching enabled filter (true)', async () => {
      const filters = { enabled: { equals: true } };
      const result = await repository.findByFilters({ filters });

      expect(result.every(d => d.enabled === true)).toBe(true);
      expect(result.length).toBe(7);
      expect(result.length).toBe(await repository.countByFilters(filters));
    });

    test('returns discounts matching enabled filter (false)', async () => {
      const filters = { enabled: { equals: false } };
      const result = await repository.findByFilters({ filters });

      expect(result.every(d => d.enabled === false)).toBe(true);
      expect(result.length).toBe(1);
      expect(result.find(d => d.id === DiscountConstants.DisabledDiscountID)).toBeDefined();
      expect(result.length).toBe(await repository.countByFilters(filters));
    });

    test('returns only active discounts when active filter is true', async () => {
      const filters = { active: { equals: true } };
      const result = await repository.findByFilters({ filters });

      const now = new Date();

      expect(
        result.every(d => {
          const hasStarted = d.startsAt <= now;
          const hasNotEnded = !d.endsAt || d.endsAt >= now;
          return hasStarted && hasNotEnded;
        })
      ).toBe(true);

      expect(result.length).toBe(await repository.countByFilters(filters));
    });

    test('returns discounts matching code contains and enabled filters', async () => {
      const filters = {
        code: { contains: 'LEVEL' },
        enabled: { equals: true }
      };
      const result = await repository.findByFilters({ filters });

      expect(result.every(d => d.code.includes('LEVEL') && d.enabled === true)).toBe(true);
      expect(result.length).toBe(2);
      expect(result.length).toBe(await repository.countByFilters(filters));
    });

    test('returns discounts matching code equals and active filters', async () => {
      const filters = {
        code: { equals: 'SUMMER2024' },
        active: { equals: true }
      };
      const result = await repository.findByFilters({ filters });

      const now = new Date();

      expect(result.length).toBe(1);
      expect(result[0].code).toBe('SUMMER2024');
      expect(result[0].startsAt.getTime()).toBeLessThanOrEqual(now.getTime());
      expect(result[0].endsAt?.getTime()).toBeGreaterThanOrEqual(now.getTime());
      expect(result.length).toBe(await repository.countByFilters(filters));
    });

    test('returns discounts matching active and enabled filters', async () => {
      const filters = {
        active: { equals: true },
        enabled: { equals: true }
      };
      const result = await repository.findByFilters({ filters });

      const now = new Date();

      expect(
        result.every(d => {
          const startsAtValid = d.startsAt <= now;
          const endsAtValid = !d.endsAt || d.endsAt >= now;
          return startsAtValid && endsAtValid && d.enabled === true;
        })
      ).toBe(true);

      expect(result.length).toBe(await repository.countByFilters(filters));
    });

    test('returns limited number of discounts', async () => {
      const result = await repository.findByFilters({ take: 3 });

      expect(result).toHaveLength(3);
    });

    test('returns discounts with offset', async () => {
      const result = await repository.findByFilters({ skip: 2 });

      expect(result).toHaveLength(6);
    });

    test('returns discounts with pagination applied', async () => {
      const result = await repository.findByFilters({
        take: 2,
        skip: 1
      });

      expect(result).toHaveLength(2);
    });

    test('returns empty array when no discounts match filters', async () => {
      const filters = { code: { equals: 'NONEXISTENT' } };
      const result = await repository.findByFilters({ filters });

      expect(result).toHaveLength(0);
      expect(result.length).toBe(await repository.countByFilters(filters));
    });

    test('returns all discounts when no filters provided', async () => {
      const result = await repository.findByFilters();
      const totalDiscounts = (await new DiscountFixtures().build()).length;

      expect(result).toHaveLength(totalDiscounts);
      expect(result.length).toBe(await repository.countByFilters({}));
    });
  });
});
