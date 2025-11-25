import { queryClient } from '@/app/app';
import { useGqlMutation } from '@/lib/api/fetchers/use-gql-mutation-v2';
import { UPDATE_VARIANT_MUTATION } from '@/lib/api/operations/variant.operations';
import type { MutationUpdateVariantArgs } from '@/lib/api/types';
import type { ActionResult } from '@/shared/utils/result.utils';

import { ProductCacheKeys } from '../constants/cache-keys';

export const useUpdateVariant = (productId: string) => {
  const { mutateAsync: updateVariant } = useGqlMutation(UPDATE_VARIANT_MUTATION);

  const exec = async (input: MutationUpdateVariantArgs): Promise<ActionResult> => {
    try {
      await updateVariant(input);

      await queryClient.refetchQueries({ queryKey: [ProductCacheKeys.ForVariants(productId)] });
      await queryClient.refetchQueries({ queryKey: [ProductCacheKeys.Product(productId)] });

      return { isSuccess: true };
    } catch (error) {
      return { isSuccess: false, error: 'Failed to update variant' };
      console.error(error);
    }
  };

  return {
    updateVariant: exec
  };
};
