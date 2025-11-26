import { type ComponentProps, createContext, use, useMemo, useState } from 'react';
import { ImageIcon } from 'lucide-react';
import { Link, useParams } from 'react-router';
import { useDebouncedCallback } from 'use-debounce';

import { cn, Input as LuneInput } from '@lune/ui';

import type { CommonVariantFragment } from '@/lib/api/types';
import { TYPING_DEBOUNCE_DELAY } from '@/shared/utils/constants.utils';

type ContextSchema = {
  variants: CommonVariantFragment[];
  onQueryChange: (query: string) => void;
};

const Context = createContext<ContextSchema>({
  variants: [],
  onQueryChange: () => void 0
});

const useVariantListContext = () => use(Context);

const Root = ({
  variants: allVariants,
  ...props
}: ComponentProps<'div'> & { variants: CommonVariantFragment[] }) => {
  const [query, setQuery] = useState('');

  const onQueryChange = useDebouncedCallback(setQuery, TYPING_DEBOUNCE_DELAY);

  const variants = useMemo(() => {
    return allVariants.filter(v => {
      const name = v.optionValues.map(ov => ov.name).join(' / ');

      return name.toLowerCase().includes(query.toLowerCase());
    });
  }, [query]);

  return (
    <Context.Provider value={{ variants, onQueryChange }}>
      <div className="flex flex-col gap-4" {...props} />
    </Context.Provider>
  );
};

const Input = (props: ComponentProps<'input'>) => {
  const { onQueryChange } = useVariantListContext();

  return <LuneInput onChange={e => onQueryChange(e.target.value)} {...props} />;
};

const List = ({ className, ...props }: ComponentProps<'a'>) => {
  const { id, variantId } = useParams() as { variantId: string; id: string };
  const { variants } = useVariantListContext();

  return (
    <>
      {variants.map(variant => {
        const name = variant.optionValues.map(ov => ov.name).join(' / ');
        const isSelected = variantId === variant.id;

        return (
          <Link
            {...props}
            className={cn(
              'w-full flex items-center gap-3 py-3 px-4',
              isSelected ? 'bg-muted font-semibold' : 'hover:bg-muted/30',
              className
            )}
            key={variant.id}
            to={`/products/${id}/variants/${variant.id}`}
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
    </>
  );
};

const VariantsList = Object.assign(Root, {
  Input,
  List
});

export { VariantsList };
