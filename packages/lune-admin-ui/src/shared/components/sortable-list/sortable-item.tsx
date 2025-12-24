import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type UseSortableReturn = Omit<
  ReturnType<typeof useSortable>,
  'setNodeRef' | 'transform' | 'transition'
>;

export const SortableItem = ({ itemId, children }: Props) => {
  const { setNodeRef, transform, transition, ...rest } = useSortable({
    id: itemId
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: rest.isDragging ? '50' : undefined
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children({ ...rest })}
    </div>
  );
};

type Props = {
  itemId: string;
  children: (args: UseSortableReturn) => React.ReactNode;
};
