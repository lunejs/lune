import { Transaction } from '../../connection';
import { User } from '../../entities/user';
import { Repository } from '../repository';
import { TABLES } from '../../tables';
import { UserSerializer } from '../../serializers/user';
import { RepositoryError } from '../repository.error';

export class UserRepository extends Repository<User> {
  constructor(trx: Transaction) {
    super(TABLES.USERS, trx, new UserSerializer());
  }

  async findByEmail(email: string) {
    try {
      return await this.findOne({ where: { email } });
    } catch (error) {
      throw new RepositoryError('UserRepository.emailExists', error);
    }
  }
}
