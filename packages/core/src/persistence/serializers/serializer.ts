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
export class Serializer<Entity, Table> {
  /**
   * @param fields
   * Array of field mappings for serialization and deserialization.
   * Each tuple contains the source field name (from the table) and the target field name (in the entity).
   * [[from, to], [from, to], ...]
   */
  constructor(private readonly fields: [string, string][]) {}

  /**
   * @description
   * Deserialize a row from the database table into an entity.
   */
  deserialize(row: Partial<Table>): Partial<Entity> {
    try {
      const result: Partial<Entity> = {};

      for (const [from, to] of this.fields) {
        if (row[from] !== undefined) {
          result[to] = row[from];
        }
      }

      return result;
    } catch (error) {
      throw new SerializeError('Failed to deserialize row', error);
    }
  }

  /**
   * @description
   * Serialize an entity into a row for the database table.
   */
  serialize(data: Partial<Entity>): Partial<Table> {
    try {
      const result: Partial<Table> = {};

      for (const [from, to] of this.fields) {
        if (data[to] !== undefined) {
          result[from] = data[to];
        }
      }

      return result;
    } catch (error) {
      throw new SerializeError('Failed to serialize data', error);
    }
  }

  /**
   * @description
   * Serialize an array of fields from the entity to the table representation.
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
      throw new SerializeError('Failed to serialize fields', error);
    }
  }
}

export class SerializeError extends Error {
  constructor(message: string, error: unknown) {
    super(message);
    this.name = 'SerializeError';

    if (process.env.NODE_ENV !== 'test') {
      console.error({
        message,
        error
      });
    }
  }
}
