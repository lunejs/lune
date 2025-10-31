export * from './codegen';
export * from './codegen/graphql';

export type LuneAsset = {
  id: string;
  name: string;
  source: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: Date | null;
  type: 'IMAGE';
};
