import { List, Node } from '@/api/shared/types/graphql';

export class ListResponse<T extends Node> implements List {
  constructor(
    readonly items: T[],
    readonly count: number,
    readonly pageInfo: { total: number }
  ) {}
}
