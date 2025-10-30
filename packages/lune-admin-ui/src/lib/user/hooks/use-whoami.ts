import { getFragmentData } from '@/lib/api/codegen';
import { useGqlQuery } from '@/lib/api/fetchers/use-gql-query';
import { COMMON_USER_FRAGMENT, WHOAMI_QUERY } from '@/lib/api/operations/user.operations';

export const useWhoami = () => {
  const { data, isLoading, refetch } = useGqlQuery(WHOAMI_QUERY);

  const user = getFragmentData(COMMON_USER_FRAGMENT, data?.whoami);

  return {
    user,
    isLoading,
    refetch
  };
};
