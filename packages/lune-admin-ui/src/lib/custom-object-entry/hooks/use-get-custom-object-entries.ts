import { useGqlQuery } from '@/lib/api/fetchers/use-gql-query';
import { GET_CUSTOM_OBJECT_ENTRIES_QUERY } from '@/lib/api/operations/custom-object-entry.operations';
import type { ListInput } from '@/lib/api/types';

import { CustomObjectEntryCacheKeys } from '../constants/cache-keys';

type Input = ListInput & {
  filters?: {
    slug?: { contains: string };
  };
};

export const useGetCustomObjectEntries = (definitionId: string, input: Input) => {
  const result = useGqlQuery(GET_CUSTOM_OBJECT_ENTRIES_QUERY, {
    key: [CustomObjectEntryCacheKeys.All, definitionId],
    variables: { definitionId, input: { skip: input.skip, take: input.take } }
  });

  let customObjectEntries = result.data?.customObjectEntries.items ?? [];

  // Client-side filtering since ListInput doesn't support filters
  if (input.filters?.slug?.contains) {
    const search = input.filters.slug.contains.toLowerCase();
    customObjectEntries = customObjectEntries.filter(entry =>
      entry.slug.toLowerCase().includes(search)
    );
  }

  const { count, pageInfo } = result.data?.customObjectEntries ?? {};

  return {
    customObjectEntries,
    pagination: { count, pageInfo },
    ...result
  };
};
