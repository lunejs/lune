import { subMinutes } from 'date-fns';

import { convertToCent } from '@vendyx/common';

import type { ProductTable } from '@/persistence/entities/product';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestHelper } from '@/tests/utils/test-helper';

import { ShopConstants } from './shop.fixtures';

const TODAY = new Date();

export const ProductConstants = {
  MacBookPro16ID: TestHelper.generateUUID(),
  iPhone14ProMaxID: TestHelper.generateUUID(),
  AppleWatchSeries8ID: TestHelper.generateUUID(),
  AirPodsPro2ndGenID: TestHelper.generateUUID(),

  ShirtID: TestHelper.generateUUID(),
  JeansID: TestHelper.generateUUID(),
  JacketID: TestHelper.generateUUID(),
  SneakersID: TestHelper.generateUUID(),
  BeachShirtID: TestHelper.generateUUID()
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
