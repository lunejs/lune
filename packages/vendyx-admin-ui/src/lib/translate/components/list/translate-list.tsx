import type { CommonListProductFragment } from '@/lib/api/types';

import { TranslateListItem } from './item/translate-list-item';
import { TranslateListToolbar } from './toolbar/translate-list-toolbar';

export const TranslateList = ({ entities, entityId }: Props) => {
  return (
    <aside className="w-96 divide-y border-r h-full flex flex-col gap-4 shrink-0">
      <TranslateListToolbar />
      <div className="flex flex-col gap-4 px-4">
        {entities?.map(entity => {
          const isSelected = entity.id === entityId;

          return (
            <TranslateListItem
              href={`/translate/products/${entity.id}`}
              isSelected={isSelected}
              title={entity.name}
              image={entity.assets.items[0]?.source}
            />
          );
        })}
      </div>
    </aside>
  );
};

type Props = {
  entityId: string;
  entities: CommonListProductFragment[];
};
