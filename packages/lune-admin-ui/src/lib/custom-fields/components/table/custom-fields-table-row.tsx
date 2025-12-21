import { ChevronRightIcon, type LucideIcon } from 'lucide-react';
import { Link } from 'react-router';

import { cn, Small } from '@lune/ui';

export const CustomFieldsTableRow = ({ quantity, entity, icon: Icon, className }: Props) => {
  return (
    <Link
      to={`/settings/custom-fields/product`}
      className={cn(
        'p-4 flex items-center justify-between gap-4 hover:bg-muted/50 transition-colors',
        className
      )}
    >
      <div className="flex items-center gap-3">
        <Icon size={20} />

        <Small>{entity}</Small>
      </div>
      <div className="flex items-center gap-2">
        <Small>{quantity}</Small>
        <ChevronRightIcon size={20} />
      </div>
    </Link>
  );
};

type Props = {
  quantity: number;
  entity: string;
  icon: LucideIcon;
  className?: string;
};
