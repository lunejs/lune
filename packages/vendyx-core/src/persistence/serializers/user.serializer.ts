import type { User, UserTable } from '@/persistence/entities/user';

import { Serializer } from './serializer';

export class UserSerializer extends Serializer<User, UserTable> {
  constructor() {
    super([
      ['id', 'id'],
      ['created_at', 'createdAt'],
      ['updated_at', 'updatedAt'],
      ['email', 'email'],
      ['password', 'password']
    ]);
  }
}
