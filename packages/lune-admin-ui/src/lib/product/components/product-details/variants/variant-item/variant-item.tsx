import { type FC } from 'react';
import { isUUID } from '@lunejs/common';
import { Checkbox, cn, Input } from '@lunejs/ui';
import { Link } from 'react-router';

import { useVariantContext, type VariantContext } from '../variants.context';

export const VariantItem: FC<Props> = ({ variant, groupName, className }) => {
  const { product, variants, updateVariants } = useVariantContext();

  const inGroup = Boolean(groupName);

  const variantName = inGroup
    ? variant.values
        .filter(v => v.name !== groupName)
        .map(v => v.name)
        .join('/')
    : variant.values.map(v => v.name).join(' / ');

  return (
    <div className={cn('flex items-center px-6 py-4 hover:bg-muted/50', className)}>
      <div className={cn('flex items-center gap-4 w-full', inGroup && 'pl-8')}>
        <Checkbox
          aria-label={`Select variant "${variantName}"`}
          checked={variant.selected}
          onCheckedChange={checked =>
            updateVariants(
              variants.map(v => (v.id === variant.id ? { ...v, selected: Boolean(checked) } : v))
            )
          }
        />
        {isUUID(variant.id) ? (
          <Link
            to={`/products/${product?.id}/variants/${variant.id}`}
            className="hover:underline w-full cursor-pointer"
          >
            {variantName}
          </Link>
        ) : (
          <span className="w-full">{variantName}</span>
        )}
      </div>
      <div className="flex items-center gap-2 w-full">
        <Input
          onChange={e =>
            updateVariants(
              variants.map(v => (v.id === variant.id ? { ...v, price: e.target.value } : v))
            )
          }
          value={variant.price}
          placeholder="$ 0.00"
        />
        <Input
          value={variant.stock}
          onChange={e =>
            updateVariants(
              variants.map(v => (v.id === variant.id ? { ...v, stock: Number(e.target.value) } : v))
            )
          }
          type="number"
          placeholder="0"
        />
      </div>
    </div>
  );
};

type Props = {
  variant: VariantContext['variants'][0];
  /**
   * Determines if the variant is being rendered inside a group
   */
  groupName?: string;
  className?: string;
};
