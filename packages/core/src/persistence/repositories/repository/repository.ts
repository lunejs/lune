import { Transaction } from '../../connection';
import { Serializer } from '../../serializers/serializer';
import { RepositoryError } from '../repository.error';

/**
 * @description
 * A generic repository class for performing CRUD operations on a database table.
 */
export class Repository<T extends object> {
  constructor(
    private readonly tableName: string,
    private readonly trx: Transaction,
    private readonly serializer: Serializer<T, unknown>
  ) {}

  protected q() {
    return this.trx<T>(this.tableName);
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

  async findMany(input: FindManyOptions<T>): Promise<T[]> {
    try {
      const query = this.trx(this.tableName);

      if (input.fields) query.select(this.serializer.serializeFields(input.fields));
      if (input.limit) query.limit(input.limit);
      if (input.offset) query.offset(input.offset);
      if (input.where) query.where(this.serializer.serialize(input.where));

      const results = await query;

      return results.map(result => this.serializer.deserialize(result) as T);
    } catch (error) {
      throw new RepositoryError('Repository.findMany', error);
    }
  }

  async count(input: CountOptions<T>): Promise<number> {
    try {
      const query = this.trx(this.tableName)
        .count('* as count')
        .where(this.serializer.serialize(input.where));

      const [{ count }] = await query;

      return Number(count);
    } catch (error) {
      throw new RepositoryError('Repository.count', error);
    }
  }

  async create(input: Input<T>): Promise<T> {
    try {
      const [result] = await this.trx(this.tableName).insert(this.serializer.serialize(input), '*');

      return this.serializer.deserialize(result) as T;
    } catch (error) {
      throw new RepositoryError('Repository.create', error);
    }
  }

  async update(input: { where: Where<T>; data: Input<T> }): Promise<T> {
    try {
      const [result] = await this.trx(this.tableName)
        .where(this.serializer.serialize(input.where))
        .update(this.serializer.serialize(input.data), '*');

      return this.serializer.deserialize(result) as T;
    } catch (error) {
      throw new RepositoryError('Repository.update', error);
    }
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
  limit?: number;
  offset?: number;
};

type CountOptions<T> = {
  where: Where<T>;
};

type Input<T> = Partial<T>;
type Fields<T> = (keyof T)[];
type Where<T> = {
  [K in keyof T]?: T[K];
};
