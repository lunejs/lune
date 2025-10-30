import type { Tables } from '@/persistence/tables';

export interface Fixture<T = unknown> {
  table: Tables;

  build(): Promise<Partial<T>[]>;
}
