import type { LuneEntity, LuneTable } from './entity';

export interface User extends LuneEntity {
  email: string;
  password: string;
}

export interface UserTable extends LuneTable {
  email: string;
  password: string;
}
