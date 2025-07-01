import { Transaction } from '@/persistence/connection';

export type GraphqlContext = {
  trx: Transaction;
  shopId: string;
};
