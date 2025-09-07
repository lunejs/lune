import { ListInput, Node } from '../types/graphql';

import { ListResponse } from './list-response';

export const getPaginatedResult = (list: Node[], input: ListInput | undefined | null) => {
  if (!input?.skip && !input?.take) {
    return new ListResponse(list, list.length, { total: list.length });
  }

  const start = input.skip ?? 0;
  const end = input.take ? start + input.take : undefined;
  const items = list.slice(start, end);

  return new ListResponse(items, items.length, { total: list.length });
};
