import { useEffect, useState } from 'react';
import { ImageIcon } from 'lucide-react';
import { Link, useParams } from 'react-router';

import { Card, CardContent, CardTitle, cn, Input } from '@lune/ui';

import type { CommonVariantFragment } from '@/lib/api/types';
import { PageLayout } from '@/shared/components/layout/page-layout';

import { VariantDetails } from '../components/variant-details/variant-details';
import { useGetProductForVariants } from '../hooks/use-get-product-for-variants';

export const VariantsPage = () => {
  const { id, variantId } = useParams() as { id: string; variantId: string };
  const { isLoading, product } = useGetProductForVariants(id);

  const [selected, setSelected] = useState<CommonVariantFragment | null>(null);

  useEffect(() => {
    setSelected(product?.variants.items.find(v => v.id === variantId) ?? null);
  }, [product, variantId]);

  // TODO: add not found
  if (!product.id) return null;

  return (
    <PageLayout
      className="max-w-5xl mx-auto w-full card-fade-in grid grid-cols-6 gap-6"
      isLoading={isLoading}
    >
      <section className="col-span-2">
        <Card className="pt-4 pb-0 overflow-hidden">
          <CardContent className="px-0 flex flex-col gap-4">
            <CardTitle className="px-4">Variants</CardTitle>
            <div className="flex flex-col gap-4">
              <div className="px-4">
                <Input placeholder="Search..." />
              </div>
              <div className="border-t">
                {product?.variants.items.map(variant => {
                  const name = variant.optionValues.map(ov => ov.name).join(' / ');
                  const isSelected = selected?.id === variant.id;

                  return (
                    <Link
                      to={`/products/${id}/variants/${variant.id}`}
                      key={variant.id}
                      className={cn(
                        'w-full flex items-center gap-3 py-3 px-4',
                        isSelected ? 'bg-muted' : 'hover:bg-muted/30'
                      )}
                      // onClick={() => setSelected(variant)}
                    >
                      {variant.assets.items[0]?.source ? (
                        <img src={variant.assets.items[0].source} className="w-8 h-8" />
                      ) : (
                        <div className="w-8 h-8 flex items-center justify-center bg-muted/50 rounded-md">
                          <ImageIcon size={16} className="text-muted-foreground" />
                        </div>
                      )}
                      <span className="text-sm">{name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
      <section className="col-span-4">
        {selected && <VariantDetails productId={product.id} variant={selected} />}
      </section>
    </PageLayout>
  );
};
