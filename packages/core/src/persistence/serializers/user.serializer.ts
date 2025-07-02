import { User, UserTable } from '../entities/user';
import { Serializer } from './serializer';

export class UserSerializer implements Serializer<User, UserTable> {
  deserialize(row: Partial<UserTable>): Partial<User> {
    const result: Partial<User> = {};

    if (row.id !== undefined) result.id = row.id;
    if (row.created_at !== undefined) result.createdAt = row.created_at;
    if (row.updated_at !== undefined) result.updatedAt = row.updated_at;
    if (row.email !== undefined) result.email = row.email;
    if (row.password !== undefined) result.password = row.password;

    return result;
  }

  serialize(data: Partial<User>): Partial<UserTable> {
    const result: Partial<UserTable> = {};

    if (data.id !== undefined) result.id = data.id;
    if (data.createdAt !== undefined) result.created_at = data.createdAt;
    if (data.updatedAt !== undefined) result.updated_at = data.updatedAt;
    if (data.email !== undefined) result.email = data.email;
    if (data.password !== undefined) result.password = data.password;

    return result;
  }

  serializeFields(fields: (keyof User)[]): string[] {
    const FIELD_MAP: Partial<Record<keyof User, keyof UserTable>> = {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    };

    return fields.map(field => FIELD_MAP[field] || (field as string));
  }
}
