import { Transaction } from '../connection';
import { Serializer } from '../serializers/serializer';

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
    const query = this.trx(this.tableName).where(input.where).first();

    if (input.fields) query.select(this.serializer.serializeFields(input.fields));

    const result = await query;

    return result ? (this.serializer.deserialize(result) as T) : undefined;
  }

  async findMany(input: FindManyOptions<T>): Promise<T[]> {
    const query = this.trx(this.tableName);

    if (input.fields) query.select(this.serializer.serializeFields(input.fields));
    if (input.limit) query.limit(input.limit);
    if (input.offset) query.offset(input.offset);
    if (input.where) query.where(this.serializer.serialize(input.where));

    const results = await query;

    return results.map(result => this.serializer.deserialize(result) as T);
  }

  async create(input: Input<T>): Promise<T> {
    const [result] = await this.trx(this.tableName).insert(input, '*');

    return this.serializer.deserialize(result) as T;
  }

  async update(input: { where: Where<T>; data: Input<T> }): Promise<T> {
    const result = await this.trx(this.tableName)
      .where(input.where)
      .update(input.data, '*')
      .first();

    return this.serializer.deserialize(result) as T;
  }

  async remove(input: { where: Where<T> }): Promise<void> {
    await this.trx(this.tableName).where(input.where).del();
  }

  async softRemove(input: { where: Where<T> }): Promise<void> {
    await this.trx(this.tableName).where(input.where).update({ deletedAt: new Date() });
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

type Input<T> = Partial<Omit<T, 'id'>>;
type Fields<T> = (keyof T)[];
type Where<T> = {
  [K in keyof T]?: T[K];
};

// const r = new Repository<{ id: string; email: string }>('users', 1 as unknown as Transaction);
