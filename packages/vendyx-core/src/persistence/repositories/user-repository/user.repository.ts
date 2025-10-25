import type { ID } from '@/persistence/entities/entity';
import { UserSerializer } from '@/persistence/serializers/user.serializer';

import type { Transaction } from '../../connection';
import type { User, UserTable } from '../../entities/user';
import { Tables } from '../../tables';
import { Repository } from '../repository';
import { RepositoryError } from '../repository.error';

export class UserRepository extends Repository<User, UserTable> {
  constructor(trx: Transaction) {
    super(Tables.Users, trx, new UserSerializer());
  }

  async findById(id: ID) {
    try {
      return await this.findOne({ where: { id } });
    } catch (error) {
      throw new RepositoryError('UserRepository.findById', error);
    }
  }

  async findByEmail(email: string) {
    try {
      return await this.findOne({ where: { email } });
    } catch (error) {
      throw new RepositoryError('UserRepository.emailExists', error);
    }
  }
}
