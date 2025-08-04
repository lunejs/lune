import { Repository } from '../repository';
import { Tables } from '@/persistence/tables';
import { Transaction } from '@/persistence/connection';
import { Product, ProductTable } from '@/persistence/entities/product';
import { ProductSerializer } from '@/persistence/serializers/product.serializer';
import { ProductListInput } from '@/api/shared/types/graphql';

export class ProductRepository extends Repository<Product, ProductTable> {
  constructor(trx: Transaction) {
    super(Tables.Product, trx, new ProductSerializer());
  }

  async findByFilters(input: ProductListInput) {
    const query = this.q();

    if (input.filters?.name) {
      if (input.filters.name.contains) {
        query.whereLike('name', `%${input.filters.name.contains}%`);
      } else if (input.filters.name.equals) {
        query.where('name', input.filters.name.equals);
      }
    }

    if (input.filters?.enabled !== undefined) query.where('enabled', input.filters.enabled?.equals);

    if (input.filters?.tag) {
      query.whereExists(function () {
        this.select('*')
          .from(Tables.ProductTag)
          .innerJoin(Tables.Tag, `${Tables.Tag}.id`, `${Tables.ProductTag}.tag_id`)
          .whereRaw(`${Tables.ProductTag}.product_id = ${Tables.Product}.id`)
          .andWhere(`${Tables.Tag}.name`, input.filters?.tag);
      });
    }

    if (input.filters?.salePriceRange?.min) {
      query.where('min_sale_price', '>=', input.filters.salePriceRange.min);
    }

    if (input.filters?.salePriceRange?.max) {
      query.where('max_sale_price', '<=', input.filters.salePriceRange.max);
    }

    if (input.filters?.optionValues?.length) {
      for (const opv of input.filters.optionValues) {
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

    if (input.sort?.createdAt) query.orderBy('created_at', this.toOrder(input.sort.createdAt));
    if (input.sort?.name) query.orderBy('name', this.toOrder(input.sort.name));
    if (input.sort?.salePrice) query.orderBy('min_sale_price', this.toOrder(input.sort.salePrice));

    if (input.take) query.limit(input.take);
    if (input.skip) query.offset(input.skip);

    return await query;
  }
}
