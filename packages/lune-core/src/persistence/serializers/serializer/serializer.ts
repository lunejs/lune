import { VendyxError } from '@/errors/vendyx.error';
import type { VendyxEntity, VendyxTable } from '@/persistence/entities/entity';
import type { RepositoryInput } from '@/persistence/repositories/repository';

/**
 * @description
 * Serializer for conversions between entity and table representations.
 *
 * @example
 * ```typescript
 * const serializer = new Serializer<User, UserTable>([
 *   ['id', 'id'],
 *   ['created_at', 'createdAt'],
 *   ['updated_at', 'updatedAt'],
 *   ['email', 'email'],
 *   ['password', 'password']
 * ]);
 */
export class Serializer<Entity extends VendyxEntity, Table extends VendyxTable> {
  /**
   * @param fields
   * Array of field mappings for serialization and deserialization.
   * Each tuple contains the source field name (from the table) and the target field name (in the entity).
   * [[from, to], [from, to], ...]
   */
  constructor(private readonly fields: [keyof Table, keyof Entity][]) {}

  /**
   * @description
   * Deserialize a row from the database table into an entity.
   *
   * @example
   * ```typescript
   * const serializer = new Serializer<User, UserTable>([
   *  ['id', 'id'],
   *  ['created_at', 'createdAt'],
   *  ['updated_at', 'updatedAt'],
   * ]);
   *
   * const row = { id: 1, created_at: '2023-01-01', updated_at: '2023-01-02' };
   * const user = serializer.deserialize(row);
   * console.log(user);
   * // Output: { id: 1, createdAt: '2023-01-01', updatedAt: '2023-01-02' }
   * ```
   */
  deserialize(row: Partial<Table>): Partial<Entity> {
    try {
      const result: Partial<Entity> = {};

      for (const [from, to] of this.fields) {
        if (row[from] !== undefined) {
          result[to] = row[from] as unknown as Entity[typeof to];
        }
      }

      return result;
    } catch (error) {
      throw new SerializeError('Serializer.deserialize', error);
    }
  }

  /**
   * @description
   * Serialize an entity into a row for the database table.
   *
   * @example
   * ```typescript
   * const serializer = new Serializer<User, UserTable>([
   *   ['id', 'id'],
   *   ['created_at', 'createdAt'],
   *   ['updated_at', 'updatedAt'],
   * ]);
   *
   * const user = { id: 1, createdAt: '2023-01-01', updatedAt: '2023-01-02' };
   * const serializedUsed = serializer.serialize(user);
   * console.log(serializedUsed);
   * // Output: { id: 1, created_at: '2023-01-01', updated_at: '2023-01-02' }
   * ```
   */
  serialize(data: Partial<RepositoryInput<Entity>>): Partial<Table> {
    try {
      const result: Partial<Table> = {};

      for (const [from, to] of this.fields) {
        const value = data[to as keyof RepositoryInput<Entity>];
        if (value !== undefined) {
          result[from] = value as unknown as Table[typeof from];
        }
      }

      return result;
    } catch (error) {
      throw new SerializeError('Serializer.serialize', error);
    }
  }

  /**
   * @description
   * Serialize an array of fields from the entity to the table representation.
   *
   * @example
   * ```typescript
   * const serializer = new Serializer<User, UserTable>([
   *  ['id', 'id'],
   *  ['created_at', 'createdAt'],
   *  ['updated_at', 'updatedAt'],
   * ]);
   *
   * const fields = ['id', 'createdAt', 'updatedAt'];
   * const serializedFields = serializer.serializeFields(fields);
   * console.log(serializedFields);
   * // Output: ['id', 'created_at', 'updated_at']
   * ```
   */
  serializeFields(fields: (keyof Entity)[]): (keyof Table | string)[] {
    try {
      const result: (keyof Table | string)[] = [];

      for (const field of fields) {
        const mapping = this.fields.find(([_, to]) => to === field);
        if (mapping) {
          result.push(mapping[0]);
        } else {
          result.push(field as string);
        }
      }

      return result;
    } catch (error) {
      throw new SerializeError('Serializer.serializeFields', error);
    }
  }

  serializeField(field: keyof Entity): keyof Table | string {
    try {
      const mapping = this.fields.find(([_, to]) => to === field);
      return mapping ? mapping[0] : (field as string);
    } catch (error) {
      throw new SerializeError('Serializer.serializeField', error);
    }
  }
}

export class SerializeError extends VendyxError {
  constructor(ctx: string, error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown serialization error';

    super(ctx, message, error);
  }
}
