import { Transaction } from '../connection';
import { UserRepository } from './user-repository';

export function buildRepositories(trx: Transaction) {
  return {
    user: new UserRepository(trx)
  };
}

export type Repositories = ReturnType<typeof buildRepositories>;
