import { JwtService } from '@/libs/jwt';
import { Transaction } from '@/persistence/connection';
import { Locale } from '@/persistence/entities/locale';
import { Repositories } from '@/persistence/repositories/build-repositories';

import { Loaders } from '../loaders/build-loaders';

export type ExecutionContext = {
  trx: Transaction;
  shopId: string | null;
  ownerId: string | null;
  runWithoutRLS: <T>(fn: () => Promise<T>) => Promise<T>;
  currentUser: CurrentUser | null;
  repositories: Repositories;
  jwtService: JwtService;
  loaders: Loaders;
  storefront?: StorefrontContext;
};

export type CurrentUser = {
  id: string;
  email: string;
};

export type StorefrontContext = {
  apiKey: string | null;
  locale: Locale | null;
};
