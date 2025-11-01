import { useState } from 'react';
import { XIcon } from 'lucide-react';
import { Link } from 'react-router';

import { Badge, cn, notification } from '@lune/ui';

import type { CommonCollectionFragment, CommonCollectionProductFragment } from '@/lib/api/types';
import { useUpdateCollection } from '@/lib/collections/hooks/use-update-collection';
import { SpinnerLoader } from '@/shared/components/loader/spinner-loader';
import { ImagePlaceholder } from '@/shared/components/placeholders/image-placeholder';

export const CollectionProductsItem = ({ collection, product, products }: Props) => {
  const [isRemoving, setIsRemoving] = useState(false);

  const { updateCollection } = useUpdateCollection();

  return (
    <article
      key={product.id}
      className={cn(
        'flex items-center justify-between px-6 py-2 hover:bg-muted/30',
        isRemoving && 'opacity-40'
      )}
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
        <button
          type="button"
          className="text-muted-foreground p-2 hover:bg-muted transition-colors rounded-sm cursor-pointer disabled:pointer-events-none"
          disabled={isRemoving}
          onClick={async () => {
            setIsRemoving(true);

            const result = await updateCollection(collection.id, {
              products: [...products.map(p => p.id).filter(id => id !== product.id)]
            });

            if (!result.isSuccess) {
              notification.error(result.error);
              setIsRemoving(false);
              return;
            }

            notification.success('Product removed');
            setIsRemoving(false);
          }}
        >
          {isRemoving ? <SpinnerLoader /> : <XIcon size={16} />}
        </button>
      </div>
    </article>
  );
};

type Props = {
  product: CommonCollectionProductFragment;
  products: CommonCollectionProductFragment[];
  collection: CommonCollectionFragment;
};
