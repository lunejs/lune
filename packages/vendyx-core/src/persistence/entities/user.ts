import type { VendyxEntity, VendyxTable } from './entity';

export interface User extends VendyxEntity {
  email: string;
  password: string;
}

export interface UserTable extends VendyxTable {
  email: string;
  password: string;
}
