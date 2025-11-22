import { queryClient } from '@/app/app';
import { useGqlMutationDEPRECATED } from '@/lib/api/fetchers/use-gql-mutation';
import { ADD_TRANSLATION_TO_PRODUCT } from '@/lib/api/operations/product.operations';
import type { AddProductTranslationInput } from '@/lib/api/types';
import type { ActionResult } from '@/shared/utils/result.utils';

import { ProductCacheKeys } from '../constants/cache-keys';

export const useAddProductTranslation = () => {
  const { mutateAsync: addTranslation } = useGqlMutationDEPRECATED(ADD_TRANSLATION_TO_PRODUCT);

  const exec = async (id: string, input: AddProductTranslationInput): Promise<ActionResult> => {
    try {
      await addTranslation({ id, input });

      await queryClient.refetchQueries({
        queryKey: [ProductCacheKeys.ProductForTranslation(id)]
      });

      return { isSuccess: true };
    } catch (error) {
      console.error(error);
      return { isSuccess: false, error: 'Failed to add translation' };
    }
  };

  return {
    addProductTranslation: exec
  };
};
