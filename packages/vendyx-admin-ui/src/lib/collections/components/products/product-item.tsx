import { XIcon } from 'lucide-react';
import { Link } from 'react-router';

import { Badge } from '@vendyx/ui';

import type { CommonCollectionProductFragment } from '@/lib/api/types';
import { ImagePlaceholder } from '@/shared/components/placeholders/image-placeholder';

export const CollectionProductsItem = ({ product }: Props) => {
  return (
    <article
      key={product.id}
      className="flex items-center justify-between px-6 py-2 hover:bg-muted/30"
    >
      <Link to={`/products/${product.id}`} className="flex items-center gap-2 hover:underline">
        {product.assets.items[0]?.source ? (
          <img
            className="w-10 h-10 object-cover rounded-md"
            src={product.assets.items[0]?.source}
          />
        ) : (
          <ImagePlaceholder className="w-10 h-10" initial={product.name} />
        )}
        <span>{product.name}</span>
      </Link>
      <div className="flex items-center gap-4">
        <Badge variant={product.enabled ? 'default' : 'secondary'}>
          {product.enabled ? 'Published' : 'Unpublished'}
        </Badge>
        <button className="text-muted-foreground p-2 hover:bg-muted transition-colors rounded-sm cursor-pointer">
          <XIcon size={16} />
        </button>
      </div>
    </article>
  );
};

type Props = {
  product: CommonCollectionProductFragment;
};
