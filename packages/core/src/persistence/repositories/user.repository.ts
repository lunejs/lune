import { Transaction } from '../connection';
import { User } from '../entities/user';
import { Repository } from './repository';
import { TABLES } from '../tables';
import { UserSerializer } from '../serializers/user';

export class UserRepository extends Repository<User> {
  constructor(trx: Transaction) {
    super(TABLES.USERS, trx, new UserSerializer());
  }

  async emailExists(email: string) {
    return await this.findOne({ where: { email } });
  }
}
