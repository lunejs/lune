import { subMinutes } from 'date-fns';

import { convertToCent } from '@lunejs/common';

import type { ProductTable } from '@/persistence/entities/product';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ShopConstants } from './shop.fixtures';

const TODAY = new Date();

export const ProductConstants = {
  MacBookPro16ID: TestUtils.generateUUID(),
  iPhone14ProMaxID: TestUtils.generateUUID(),
  AppleWatchSeries8ID: TestUtils.generateUUID(),
  AirPodsPro2ndGenID: TestUtils.generateUUID(),

  ShirtID: TestUtils.generateUUID(),
  JeansID: TestUtils.generateUUID(),
  JacketID: TestUtils.generateUUID(),
  SneakersID: TestUtils.generateUUID(),
  BeachShirtID: TestUtils.generateUUID()
};

export class ProductFixtures implements Fixture<ProductTable> {
  table: Tables = Tables.Product;

  async build(): Promise<Partial<ProductTable>[]> {
    return [
      {
        created_at: TODAY,
        id: ProductConstants.MacBookPro16ID,
        name: 'MacBook Pro 16',
        enabled: true,
        min_sale_price: convertToCent(23_000),
        max_sale_price: convertToCent(32_000),
        shop_id: ShopConstants.ID
      },
      {
        created_at: subMinutes(TODAY, 30),
        id: ProductConstants.iPhone14ProMaxID,
        name: 'iPhone 14 Pro Max',
        enabled: true,
        min_sale_price: convertToCent(25_000),
        max_sale_price: convertToCent(32_000),
        shop_id: ShopConstants.ID
      },
      {
        created_at: subMinutes(TODAY, 60),
        id: ProductConstants.AppleWatchSeries8ID,
        name: 'Apple Watch Series 8',
        enabled: false,
        min_sale_price: convertToCent(10_000),
        max_sale_price: convertToCent(18_000),
        shop_id: ShopConstants.ID
      },
      {
        created_at: subMinutes(TODAY, 90),
        id: ProductConstants.AirPodsPro2ndGenID,
        name: 'AirPods Pro 2nd Gen',
        enabled: false,
        min_sale_price: convertToCent(9_000),
        max_sale_price: convertToCent(12_000),
        shop_id: ShopConstants.ID
      },
      {
        created_at: subMinutes(TODAY, 120),
        id: ProductConstants.ShirtID,
        name: 'Casual Shirt',
        enabled: true,
        min_sale_price: convertToCent(20),
        max_sale_price: convertToCent(50),
        shop_id: ShopConstants.ID
      },
      {
        created_at: subMinutes(TODAY, 150),
        id: ProductConstants.JeansID,
        name: 'Denim Jeans',
        enabled: true,
        min_sale_price: convertToCent(30),
        max_sale_price: convertToCent(70),
        shop_id: ShopConstants.ID
      },
      {
        created_at: subMinutes(TODAY, 180),
        id: ProductConstants.JacketID,
        name: 'Leather Jacket',
        enabled: true,
        min_sale_price: convertToCent(100),
        max_sale_price: convertToCent(200),
        shop_id: ShopConstants.ID
      },
      {
        created_at: subMinutes(TODAY, 210),
        id: ProductConstants.SneakersID,
        name: 'Running Sneakers',
        enabled: true,
        min_sale_price: convertToCent(50),
        max_sale_price: convertToCent(120),
        shop_id: ShopConstants.ID
      },
      {
        created_at: subMinutes(TODAY, 240),
        id: ProductConstants.BeachShirtID,
        name: 'Beach Shirt',
        enabled: true,
        min_sale_price: convertToCent(15),
        max_sale_price: convertToCent(35),
        shop_id: ShopConstants.ID
      }
    ];
  }
}
