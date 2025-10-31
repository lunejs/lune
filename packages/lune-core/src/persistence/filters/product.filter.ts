import type { Knex } from 'knex';

import { LunePrice } from '@lune/common';

import type { ProductFilters, ProductSort } from '@/api/shared/types/graphql';
import type { ProductTable } from '@/persistence/entities/product';

import { Tables } from '../tables';

import { BaseFilter } from './base.filter';

// TODO: Accept a list of tags instead a unique tag for filter
export class ProductFilter extends BaseFilter<ProductTable> {
  constructor(
    query: Knex.QueryBuilder,
    private readonly tableAlias: string = Tables.Product
  ) {
    super(query);
  }

  applySort(sort: ProductSort) {
    if (sort.createdAt) {
      this.query.orderBy(`${this.tableAlias}.created_at`, this.toOrder(sort.createdAt));
    }
    if (sort.name) {
      this.query.orderBy(`${this.tableAlias}.name`, this.toOrder(sort.name));
    }
    if (sort.salePrice) {
      this.query.orderBy(`${this.tableAlias}.min_sale_price`, this.toOrder(sort.salePrice));
    }

    return this;
  }

  applyFilters(filters: ProductFilters) {
    if (filters.name) {
      if (filters.name.contains) {
        this.query.whereRaw(`LOWER(${this.tableAlias}.name) LIKE ?`, [
          `%${filters.name.contains.toLowerCase()}%`
        ]);
      } else if (filters.name.equals) {
        this.query.where(`${this.tableAlias}.name`, filters.name.equals);
      }
    }

    if (filters.enabled !== undefined) {
      this.query.where(`${this.tableAlias}.enabled`, filters.enabled?.equals);
    }

    if (filters.archived !== undefined) {
      this.query.where(`${this.tableAlias}.archived`, filters.archived?.equals);
    } else {
      this.query.where(`${this.tableAlias}.archived`, false);
    }

    if (filters.tag) {
      const tableAlias = this.tableAlias;
      this.query.whereExists(function () {
        this.select('*')
          .from(Tables.ProductTag)
          .innerJoin(Tables.Tag, `${Tables.Tag}.id`, `${Tables.ProductTag}.tag_id`)
          .whereRaw(`${Tables.ProductTag}.product_id = ${tableAlias}.id`)
          .andWhere(`${Tables.Tag}.name`, filters.tag);
      });
    }

    if (filters.salePriceRange?.min) {
      this.query.where(
        `${this.tableAlias}.min_sale_price`,
        '>=',
        LunePrice.toCent(filters.salePriceRange.min)
      );
    }

    if (filters.salePriceRange?.max) {
      this.query.where(
        `${this.tableAlias}.max_sale_price`,
        '<=',
        LunePrice.toCent(filters.salePriceRange.max)
      );
    }

    if (filters.optionValues?.length) {
      const tableAlias = this.tableAlias;
      for (const opv of filters.optionValues) {
        this.query.whereExists(function () {
          this.select('*')
            .from(Tables.Variant)
            .innerJoin(
              `${Tables.VariantOptionValue} as vov`,
              'vov.variant_id',
              `${Tables.Variant}.id`
            )
            .innerJoin(`${Tables.OptionValue} as ov`, 'ov.id', 'vov.option_value_id')
            .innerJoin(`${Tables.Option} as o`, 'o.id', 'ov.option_id')
            .whereRaw(`${Tables.Variant}.product_id = ${tableAlias}.id`)
            .andWhereILike('o.name', opv.option)
            .whereIn('ov.name', opv.values);
        });
      }
    }

    return this;
  }
}
