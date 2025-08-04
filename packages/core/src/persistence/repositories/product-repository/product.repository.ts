import { Repository } from '../repository';
import { Tables } from '@/persistence/tables';
import { Transaction } from '@/persistence/connection';
import { Product, ProductTable } from '@/persistence/entities/product';
import { ProductSerializer } from '@/persistence/serializers/product.serializer';
import { ProductListInput } from '@/api/shared/types/graphql';
import { Knex } from 'knex';

export class ProductRepository extends Repository<Product, ProductTable> {
  constructor(trx: Transaction) {
    super(Tables.Product, trx, new ProductSerializer());
  }

  async findByFilters(input: ProductListInput) {
    const query = this.q();

    this.applyFilters(query, input.filters);

    if (input.sort?.createdAt) query.orderBy('created_at', this.toOrder(input.sort.createdAt));
    if (input.sort?.name) query.orderBy('name', this.toOrder(input.sort.name));
    if (input.sort?.salePrice) query.orderBy('min_sale_price', this.toOrder(input.sort.salePrice));

    if (input.take) query.limit(input.take);
    if (input.skip) query.offset(input.skip);

    return await query;
  }

  async countByFilters(filters: ProductListInput['filters']) {
    const query = this.q().count({ count: '*' });

    this.applyFilters(query, filters);

    const [{ count }] = await query;

    return Number(count);
  }

  private applyFilters(
    query: Knex.QueryBuilder<ProductTable, any[]>,
    filters?: ProductListInput['filters']
  ) {
    if (filters?.name) {
      if (filters.name.contains) {
        query.whereLike('name', `%${filters.name.contains}%`);
      } else if (filters.name.equals) {
        query.where('name', filters.name.equals);
      }
    }

    if (filters?.enabled !== undefined) query.where('enabled', filters.enabled?.equals);

    if (filters?.tag) {
      query.whereExists(function () {
        this.select('*')
          .from(Tables.ProductTag)
          .innerJoin(Tables.Tag, `${Tables.Tag}.id`, `${Tables.ProductTag}.tag_id`)
          .whereRaw(`${Tables.ProductTag}.product_id = ${Tables.Product}.id`)
          .andWhere(`${Tables.Tag}.name`, filters?.tag);
      });
    }

    if (filters?.salePriceRange?.min) {
      query.where('min_sale_price', '>=', filters.salePriceRange.min);
    }

    if (filters?.salePriceRange?.max) {
      query.where('max_sale_price', '<=', filters.salePriceRange.max);
    }

    if (filters?.optionValues?.length) {
      for (const opv of filters.optionValues) {
        query.whereExists(function () {
          this.select('*')
            .from(Tables.Variant)
            .innerJoin(
              `${Tables.VariantOptionValue} as vov`,
              'vov.variant_id',
              `${Tables.Variant}.id`
            )
            .innerJoin(`${Tables.OptionValue} as ov`, 'ov.id', 'vov.option_value_id')
            .innerJoin(`${Tables.Option} as o`, 'o.id', 'ov.option_id')
            .whereRaw(`${Tables.Variant}.product_id = ${Tables.Product}.id`)
            .andWhereILike('o.name', opv.option)
            .whereIn('ov.name', opv.values);
        });
      }
    }
  }
}
