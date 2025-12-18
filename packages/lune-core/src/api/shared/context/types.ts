import type { Transaction } from '@/persistence/connection/connection';
import type { Locale } from '@/persistence/entities/locale';
import type { Repositories } from '@/persistence/repositories/build-repositories';

import type { Loaders } from '../loaders/build-loaders';

export type ExecutionContext = {
  trx: Transaction;
  shopId: string | null;
  ownerId: string | null;
  runWithoutRLS: <T>(fn: () => Promise<T>) => Promise<T>;
  currentUser: CurrentUser | null;
  repositories: Repositories;
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
  currentCustomer: CurrentCustomer | null;
};

export type CurrentCustomer = {
  id: string;
  email: string;
  enabled: boolean;
};
