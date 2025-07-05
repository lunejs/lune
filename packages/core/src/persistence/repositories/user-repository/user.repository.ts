import { Transaction } from '../../connection';
import { User } from '../../entities/user';
import { Repository } from '../repository';
import { Tables } from '../../tables';
import { RepositoryError } from '../repository.error';
import { ID } from '@/persistence/entities/entity';
import { UserSerializer } from '@/persistence/serializers/user.serializer';

export class UserRepository extends Repository<User> {
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
