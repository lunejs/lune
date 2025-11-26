import { useMemo, useState } from 'react';
import { ImageIcon } from 'lucide-react';
import { Link, useParams } from 'react-router';
import { useDebouncedCallback } from 'use-debounce';

import { Card, CardContent, CardTitle, cn, Input } from '@lune/ui';

import type { CommonVariantFragment } from '@/lib/api/types';
import { TYPING_DEBOUNCE_DELAY } from '@/shared/utils/constants.utils';

export const VariantsList = ({ variants: allVariants }: Props) => {
  const { id, variantId } = useParams() as { id: string; variantId: string };

  const [query, setQuery] = useState('');

  const onQueryChange = useDebouncedCallback(setQuery, TYPING_DEBOUNCE_DELAY);

  const variants = useMemo(() => {
    return allVariants.filter(v => {
      const name = v.optionValues.map(ov => ov.name).join(' / ');

      return name.toLowerCase().includes(query.toLowerCase());
    });
  }, [query]);

  return (
    <section className="col-span-2">
      <Card className="pt-4 pb-0 overflow-hidden">
        <CardContent className="px-0 flex flex-col gap-4">
          <CardTitle className="px-4">Variants</CardTitle>
          <div className="flex flex-col gap-4">
            <div className="px-4">
              <Input placeholder="Search..." onChange={e => onQueryChange(e.target.value)} />
            </div>
            <div className="border-t max-h-[calc(100vh-48px*2-16px-16px-16px-36px-34px)] overflow-y-auto">
              {variants.map(variant => {
                const name = variant.optionValues.map(ov => ov.name).join(' / ');
                const isSelected = variantId === variant.id;

                return (
                  <Link
                    to={`/products/${id}/variants/${variant.id}`}
                    key={variant.id}
                    className={cn(
                      'w-full flex items-center gap-3 py-3 px-4',
                      isSelected ? 'bg-muted font-semibold' : 'hover:bg-muted/30'
                    )}
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
  );
};

type Props = {
  variants: CommonVariantFragment[];
};
