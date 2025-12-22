import { OrderBy } from '@/api/shared/types/graphql';
import { Tables } from '@/persistence/tables';

import type { Transaction } from '../../connection/connection';
import type { Serializer } from '../../serializers/serializer';
import { RepositoryError } from '../repository.error';

// TODO: add findOneOrThrow
// TODO: add add WhereIn param
/**
 * @description
 * A generic repository class for performing CRUD operations on a database table.
 */
export class Repository<T extends Record<string, any>, Table extends Record<string, any>> {
  constructor(
    private readonly tableName: Tables,
    protected readonly trx: Transaction,
    protected readonly serializer: Serializer<T, Table>
  ) {}

  protected q() {
    return this.trx<Table>(this.tableName);
  }

  protected applyDeletedAtClause(query: ReturnType<typeof this.q>) {
    if (!TABLES_WITH_DELETED_AT.includes(this.tableName)) return;

    query.whereNull('deleted_at');
  }

  protected toOrder(orderBy: OrderBy) {
    return orderBy === OrderBy.Asc ? 'asc' : 'desc';
  }

  async findOne(input: FindOneOptions<T>): Promise<T | undefined> {
    try {
      const query = this.trx(this.tableName).where(this.serializer.serializeWhere(input.where));

      if (!input.withDeleted) this.applyDeletedAtClause(query);

      if (input.fields) query.select(this.serializer.serializeFields(input.fields));

      const result = await query.first();

      return result ? (this.serializer.deserialize(result) as T) : undefined;
    } catch (error) {
      throw new RepositoryError(error);
    }
  }

  async findOneOrThrow(input: FindOneOptions<T>): Promise<T> {
    const result = await this.findOne(input);

    if (!result) throw new RepositoryError(`Entity not found in ${this.tableName}`);

    return result;
  }

  async findMany(input?: FindManyOptions<T>): Promise<T[]> {
    try {
      const query = this.trx(this.tableName);
      this.applyDeletedAtClause(query);

      if (input?.fields) query.select(this.serializer.serializeFields(input.fields));
      if (input?.take) query.limit(input.take);
      if (input?.skip) query.offset(input.skip);
      if (input?.where) query.where(this.serializer.serializeWhere(input.where));
      if (input?.whereIn) {
        query.whereIn(this.serializer.serializeField(input.whereIn.field), input.whereIn.values);
      }

      if (input?.orderBy) {
        for (const [field, direction] of Object.entries(input.orderBy)) {
          query.orderBy(this.serializer.serializeField(field as keyof T), direction);
        }
      }

      const results = await query;

      return results.map(result => this.serializer.deserialize(result) as T);
    } catch (error) {
      throw new RepositoryError(error);
    }
  }

  async count(input?: CountOptions<T>): Promise<number> {
    try {
      const query = this.trx(this.tableName);

      this.applyDeletedAtClause(query);

      if (input?.where) {
        for (const [key, value] of Object.entries(input.where)) {
          if (typeof value === 'string' && input.caseSensitive === false) {
            query.whereILike(this.serializer.serializeField(key as keyof T) as string, value);
          } else {
            query.where(this.serializer.serializeField(key as keyof T), value);
          }
        }
      }

      const [{ count }] = await query.count('* as count');

      return Number(count);
    } catch (error) {
      throw new RepositoryError(error);
    }
  }

  async create(input: RepositoryInput<T>): Promise<T> {
    try {
      const [result] = await this.trx(this.tableName).insert(this.serializer.serialize(input), '*');

      return this.serializer.deserialize(result) as T;
    } catch (error) {
      throw new RepositoryError(error);
    }
  }

  async createMany(input: RepositoryInput<T>[]): Promise<T[]> {
    try {
      const results = await this.trx(this.tableName).insert(
        input.map(item => this.serializer.serialize(item)),
        '*'
      );

      return results.map(result => this.serializer.deserialize(result) as T);
    } catch (error) {
      throw new RepositoryError(error);
    }
  }

  // TODO: avoid this ERR RepositoryError: Empty .update() call detected! Update data does not contain any values to update. This will result in a faulty query. Table: product_translation. Columns: .
  async update(input: { where: Where<T>; data: Partial<RepositoryInput<T>> }): Promise<T> {
    try {
      const [result] = await this.trx(this.tableName)
        .where(this.serializer.serializeWhere(input.where))
        .update(
          this.serializer.serialize({
            updatedAt: new Date(),
            ...input.data
          }),
          '*'
        );

      return this.serializer.deserialize(result) as T;
    } catch (error) {
      throw new RepositoryError(error);
    }
  }

  async upsert(input: {
    where: Where<T>;
    create: RepositoryInput<T>;
    update: Partial<RepositoryInput<T>>;
  }): Promise<T> {
    const existing = await this.findOne({ where: input.where });

    if (existing) {
      return this.update({ where: input.where, data: input.update });
    }

    return this.create(input.create);
  }

  async remove(input: { where: Where<T> }): Promise<void> {
    try {
      await this.trx(this.tableName).where(this.serializer.serializeWhere(input.where)).del();
    } catch (error) {
      throw new RepositoryError(error);
    }
  }

  async removeMany(input: { whereIn: Field<T>; values: any[] }): Promise<void> {
    try {
      await this.trx(this.tableName)
        .whereIn(this.serializer.serializeField(input.whereIn), input.values)
        .del();
    } catch (error) {
      throw new RepositoryError(error);
    }
  }

  async softRemove(input: { where: Where<T> }): Promise<T> {
    try {
      const [result] = await this.trx(this.tableName)
        .where(this.serializer.serializeWhere(input.where))
        .update({ deleted_at: new Date() }, '*');

      return this.serializer.deserialize(result) as T;
    } catch (error) {
      throw new RepositoryError(error);
    }
  }

  async softRemoveMany(input: { whereIn: Field<T>; values: any[] }): Promise<T> {
    try {
      const [result] = await this.trx(this.tableName)
        .whereIn(this.serializer.serializeField(input.whereIn), input.values)
        .update({ deleted_at: new Date() }, '*');

      return this.serializer.deserialize(result) as T;
    } catch (error) {
      throw new RepositoryError(error);
    }
  }
}

type FindOneOptions<T> = {
  where: Where<T>;
  fields?: Fields<T>;
  withDeleted?: boolean;
};

type FindManyOptions<T> = {
  where?: Where<T>;
  whereIn?: { field: Field<T>; values: T[Field<T>][] };
  fields?: Fields<T>;
  take?: number;
  skip?: number;
  orderBy?: { [K in keyof T]?: SortKey };
};

export enum SortKey {
  /**
   * @description
   * Oldest first.
   */
  Asc = 'asc',
  /**
   * @description
   * Newest first.
   */
  Desc = 'desc'
}

export type CountOptions<T> = {
  where?: Where<T>;
  caseSensitive?: boolean;
};

export type RepositoryInput<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'> & {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type Fields<T> = Field<T>[];
export type Field<T> = keyof T;
export type Where<T> = {
  [K in keyof T]?: T[K];
};

const TABLES_WITH_DELETED_AT = [
  Tables.Product,
  Tables.Variant,
  Tables.Option,
  Tables.OptionValue,
  Tables.ShippingMethod,
  Tables.PaymentMethod,
  Tables.Discount,
  'test_table'
];
