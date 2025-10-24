import { CollectionContentType } from '@/api/shared/types/graphql';
import type { Transaction } from '@/persistence/connection';
import type { CollectionTable } from '@/persistence/entities/collection';
import { Tables } from '@/persistence/tables';
import { TestHelper } from '@/tests/utils/test-helper';

import { CollectionRepository } from '../collection.repository';

import { CollectionConstants, CollectionFixtures } from './fixtures/collection.fixtures';
import { ShopFixtures } from './fixtures/shop.fixtures';
import { UserFixtures } from './fixtures/user.fixtures';

describe('Collection repository', () => {
  const testHelper = new TestHelper();

  let repository: CollectionRepository;
  let trx: Transaction;

  beforeEach(async () => {
    trx = await testHelper.generateTrx();
    repository = new CollectionRepository(trx);

    await testHelper.loadFixtures([
      new UserFixtures(),
      new ShopFixtures(),
      new CollectionFixtures()
    ]);
  });

  afterEach(async () => {
    await testHelper.resetDatabase();
  });

  afterAll(async () => {
    await testHelper.destroyDatabase();
  });

  describe('findByFilters & countByFilters', () => {
    test('returns all collections without a parent by default', async () => {
      const result = await repository.findByFilters({});

      expect(result.every(c => !c.parentId)).toBe(true);
      expect(result.length).toBe(await repository.countByFilters({}));
    });

    test('returns collections sorted by createdAt in descending order by default', async () => {
      const result = await repository.findByFilters({});

      const sorted = await trx<CollectionTable>(Tables.Collection)
        .orderBy('created_at', 'desc')
        .whereNull('parent_id');

      expect(result.map(p => p.id)).toEqual(sorted.map(p => p.id));
    });

    test('returns collections matching name filter (contains)', async () => {
      const filters = { name: { contains: 'man' } };

      const result = await repository.findByFilters({ filters });

      expect(result.map(p => p.name).every(name => name.includes('man'))).toBe(true);
      expect(result.length).toBe(await repository.countByFilters(filters));
    });

    test('returns collections matching name filter (equals)', async () => {
      const filters = { name: { equals: 'Joel' } };
      const result = await repository.findByFilters({ filters });
      console.log({ result });

      expect(result[0].name).toBe('Joel');
      expect(result.length).toBe(await repository.countByFilters(filters));
    });

    test('returns collections matching enabled filter', async () => {
      const filters = { enabled: { equals: false } };
      const result = await repository.findByFilters({ filters });

      expect(result).toHaveLength(2);
      expect(result.every(p => p.enabled)).toBe(false);
      expect(result.length).toBe(await repository.countByFilters(filters));
    });

    test('returns collections matching content type filter (PRODUCTS)', async () => {
      const filters = { contentType: CollectionContentType.Products };
      const result = await repository.findByFilters({ filters });

      expect(result).toHaveLength(11);
      expect(result.every(p => p.contentType === 'PRODUCTS')).toBe(true);
      expect(result.length).toBe(await repository.countByFilters(filters));
    });

    test('returns collections matching content type filter (COLLECTIONS)', async () => {
      const filters = { contentType: CollectionContentType.Collections };
      const result = await repository.findByFilters({ filters });

      expect(result).toHaveLength(2);
      expect(result.every(p => p.contentType === 'COLLECTIONS')).toBe(true);
      expect(result.length).toBe(await repository.countByFilters(filters));
    });

    test('returns limited number of collections', async () => {
      const result = await repository.findByFilters({ take: 4 });

      expect(result).toHaveLength(4);
      expect(await repository.countByFilters({})).toBe(8);
    });

    test('returns collections with offset', async () => {
      const result = await repository.findByFilters({ skip: 5 });

      expect(result).toHaveLength(3);
      expect(await repository.countByFilters({})).toBe(8);
    });

    test('returns collections with pagination', async () => {
      const result = await repository.findByFilters({ take: 2, skip: 4 });

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe(CollectionConstants.WaterCollection);
      expect(result[1].id).toBe(CollectionConstants.Lego);
      expect(await repository.countByFilters({})).toBe(8);
    });

    test('returns collections with name and content type filter applied', async () => {
      const filters = { name: { equals: 'Ale' }, contentType: CollectionContentType.Products };
      const result = await repository.findByFilters({ filters });

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(CollectionConstants.AlesCollection);
      expect(result.length).toBe(await repository.countByFilters(filters));
    });
  });
});
