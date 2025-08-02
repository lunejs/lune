import { Repository } from '../repository';
import { Tables } from '@/persistence/tables';
import { Transaction } from '@/persistence/connection';
import { Product, ProductTable } from '@/persistence/entities/product';
import { ProductSerializer } from '@/persistence/serializers/product.serializer';

export class ProductRepository extends Repository<Product, ProductTable> {
  constructor(trx: Transaction) {
    super(Tables.Shop, trx, new ProductSerializer());
  }
}
