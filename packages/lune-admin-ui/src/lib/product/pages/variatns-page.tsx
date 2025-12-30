import { useMemo } from 'react';
import { useParams } from 'react-router';

import { Card, CardContent, CardTitle } from '@lunejs/ui';

import { PageLayout } from '@/shared/components/layout/page-layout';
import { NotFound } from '@/shared/components/not-found/not-found';

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
  if (!product.id) return <NotFound />;

  return (
    <PageLayout
      className="max-w-5xl mx-auto w-full fade-in grid grid-cols-6 gap-6"
      isLoading={isLoading}
    >
      <section className="col-span-2 hidden lg:block">
        <Card className="pt-4 pb-0 overflow-hidden">
          <CardContent className="px-0 flex flex-col gap-4">
            <CardTitle className="px-4">Variants</CardTitle>

            <VariantsList variants={product.variants.items}>
              <div className="px-4">
                <VariantsList.Input placeholder="Search..." />
              </div>
              <div className="border-t max-h-[calc(100vh-48px*2-16px-16px-16px-36px-34px)] overflow-y-auto">
                <VariantsList.List />
              </div>
            </VariantsList>
          </CardContent>
        </Card>
      </section>
      <section className="col-span-6 lg:col-span-4">
        {selected && (
          <VariantDetails
            productId={product.id}
            variant={selected}
            variants={product.variants.items}
          />
        )}
      </section>
    </PageLayout>
  );
};
