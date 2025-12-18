import type { ID } from '@/persistence/entities/entity';
import { UserSerializer } from '@/persistence/serializers/user.serializer';

import type { Transaction } from '../../connection/connection';
import type { User, UserTable } from '../../entities/user';
import { Tables } from '../../tables';
import { Repository } from '../repository';

export class UserRepository extends Repository<User, UserTable> {
  constructor(trx: Transaction) {
    super(Tables.Users, trx, new UserSerializer());
  }

  async findById(id: ID) {
    return await this.findOne({ where: { id } });
  }

  async findByEmail(email: string) {
    return await this.findOne({ where: { email } });
  }
}
