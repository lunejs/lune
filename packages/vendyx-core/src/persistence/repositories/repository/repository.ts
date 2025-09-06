import { OrderBy } from '@/api/shared/types/graphql';
import { VendyxEntity, VendyxTable } from '@/persistence/entities/entity';
import { Tables } from '@/persistence/tables';

import { Transaction } from '../../connection';
import { Serializer } from '../../serializers/serializer';
import { RepositoryError } from '../repository.error';

/**
 * @description
 * A generic repository class for performing CRUD operations on a database table.
 */
export class Repository<T extends VendyxEntity, Table extends VendyxTable> {
  constructor(
    private readonly tableName: string,
    protected readonly trx: Transaction,
    protected readonly serializer: Serializer<T, Table>
  ) {}

  protected q(table?: Tables) {
    return this.trx<Table>(table ?? this.tableName);
  }

  protected toOrder(orderBy: OrderBy) {
    return orderBy === OrderBy.Asc ? 'asc' : 'desc';
  }

  async findOne(input: FindOneOptions<T>): Promise<T | undefined> {
    try {
      const query = this.trx(this.tableName).where(this.serializer.serialize(input.where)).first();

      if (input.fields) query.select(this.serializer.serializeFields(input.fields));

      const result = await query;

      return result ? (this.serializer.deserialize(result) as T) : undefined;
    } catch (error) {
      throw new RepositoryError('Repository.findOne', error);
    }
  }

  async findMany(input?: FindManyOptions<T>): Promise<T[]> {
    try {
      const query = this.trx(this.tableName);

      if (input?.fields) query.select(this.serializer.serializeFields(input.fields));
      if (input?.take) query.limit(input.take);
      if (input?.skip) query.offset(input.skip);
      if (input?.where) query.where(this.serializer.serialize(input.where));

      if (input?.orderBy) {
        for (const [field, direction] of Object.entries(input.orderBy)) {
          query.orderBy(this.serializer.serializeField(field as keyof T), direction);
        }
      }

      const results = await query;

      return results.map(result => this.serializer.deserialize(result) as T);
    } catch (error) {
      throw new RepositoryError('Repository.findMany', error);
    }
  }

  async count(input?: CountOptions<T>): Promise<number> {
    try {
      const query = this.trx(this.tableName).count('* as count');

      if (input?.where) query.where(this.serializer.serialize(input.where));

      const [{ count }] = await query;

      return Number(count);
    } catch (error) {
      throw new RepositoryError('Repository.count', error);
    }
  }

  async create(input: RepositoryInput<T>): Promise<T> {
    try {
      const [result] = await this.trx(this.tableName).insert(this.serializer.serialize(input), '*');

      return this.serializer.deserialize(result) as T;
    } catch (error) {
      throw new RepositoryError('Repository.create', error);
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
      throw new RepositoryError('Repository.createMany', error);
    }
  }

  async update(input: { where: Where<T>; data: Partial<RepositoryInput<T>> }): Promise<T> {
    try {
      const [result] = await this.trx(this.tableName)
        .where(this.serializer.serialize(input.where))
        .update(
          this.serializer.serialize({
            updatedAt: new Date(),
            ...input.data
          }),
          '*'
        );

      return this.serializer.deserialize(result) as T;
    } catch (error) {
      throw new RepositoryError('Repository.update', error);
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
      await this.trx(this.tableName).where(input.where).del();
    } catch (error) {
      throw new RepositoryError('Repository.remove', error);
    }
  }

  async softRemove(input: { where: Where<T> }): Promise<void> {
    try {
      await this.trx(this.tableName)
        .where(this.serializer.serialize(input.where))
        .update({ deleted_at: new Date() });
    } catch (error) {
      throw new RepositoryError('Repository.softRemove', error);
    }
  }
}

type FindOneOptions<T> = {
  where: Where<T>;
  fields?: Fields<T>;
};

type FindManyOptions<T> = {
  where?: Where<T>;
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
};

export type RepositoryInput<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'> & {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type Fields<T> = (keyof T)[];
export type Where<T> = {
  [K in keyof T]?: T[K];
};
