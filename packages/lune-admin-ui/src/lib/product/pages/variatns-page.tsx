import { useMemo } from 'react';
import { useParams } from 'react-router';

import { PageLayout } from '@/shared/components/layout/page-layout';

import { VariantDetails } from '../components/variant-details/variant-details';
import { VariantsList } from '../components/variant-details/variants-list/variants-list';
import { useGetProductForVariants } from '../hooks/use-get-product-for-variants';

export const VariantsPage = () => {
  const { id, variantId } = useParams() as { id: string; variantId: string };
  const { isLoading, product } = useGetProductForVariants(id);

  const selected = useMemo(
    () => product?.variants.items.find(v => v.id === variantId) ?? null,
    [product, variantId]
  );

  // TODO: add not found
  if (!product.id) return null;

  return (
    <PageLayout
      className="max-w-5xl mx-auto w-full fade-in grid grid-cols-6 gap-6"
      isLoading={isLoading}
    >
      <VariantsList variants={product.variants.items} />
      <section className="col-span-4">
        {selected && <VariantDetails productId={product.id} variant={selected} />}
      </section>
    </PageLayout>
  );
};
