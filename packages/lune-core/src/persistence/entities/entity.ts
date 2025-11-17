export interface LuneEntity {
  id: ID;
  createdAt: Date;
  updatedAt: Date;
}

export interface LuneTable {
  id: ID;
  created_at: Date;
  updated_at: Date;
}

export type ID = string;

export type HandlerConfig = {
  code: string;
  args: Record<string, string>;
};
