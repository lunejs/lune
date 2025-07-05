import { JwtService } from '@/libs/jwt';
import { Transaction } from '@/persistence/connection';
import { Repositories } from '@/persistence/repositories/build-repositories';

export type GraphqlContext = {
  trx: Transaction;
  shopId: string;
  currentUser: CurrentUser | null;
  repositories: Repositories;
  jwtService: JwtService;
};

export type CurrentUser = {
  id: string;
  email: string;
};
