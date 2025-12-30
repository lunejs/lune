import { useMemo, useState } from 'react';
import { notification } from '@lunejs/ui';

import type { CommonListProductFragment } from '@/lib/api/types';
import { useUpdateCollection } from '@/lib/collections/hooks/use-update-collection';
import { useGetProducts } from '@/lib/product/hooks/use-get-products';

export const useProductsSelector = (collectionId: string) => {
  const [query, setQuery] = useState('');

  const { updateCollection } = useUpdateCollection();
  const { isLoading, products: fetchedProducts } = useGetProducts();

  const products = useMemo(
    () => fetchedProducts.filter(p => p.name.toLowerCase().includes(query.toLowerCase())),
    [fetchedProducts]
  );

  const selectProducts = async (selected: CommonListProductFragment[]) => {
    const result = await updateCollection(collectionId, {
      products: selected.map(s => s.id)
    });

    if (!result.isSuccess) {
      notification.error(result.error);
    } else {
      notification.success('Products added');
    }

    return result.isSuccess;
  };

  return {
    products,
    isLoading,
    setQuery,
    selectProducts
  };
};
