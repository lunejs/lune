import { CircleIcon } from 'lucide-react';
import { Link } from 'react-router';

import { Card, CardContent, cn, P } from '@lunejs/ui';

import { ImagePlaceholder } from '@/shared/components/placeholders/image-placeholder';

export const TranslateListItem = ({ href, isSelected, image, title }: Props) => {
  return (
    <Link to={href}>
      <Card className={cn('w-full p-4', isSelected && 'border-primary')}>
        <CardContent className="p-0 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {image ? (
              <img src={image} alt={title} className="w-8 h-8 rounded-sm object-cover shrink-0" />
            ) : (
              <ImagePlaceholder
                className="w-8 h-8 rounded-sm object-cover shrink-0"
                initial={title}
              />
            )}
            <P className="leading-none">{title}</P>
          </div>
          {isSelected && (
            <div className="shrink-0 rounded-full border size-4 flex items-center justify-center bg-input/30">
              <CircleIcon className="fill-primary size-2" />
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

type Props = {
  href: string;
  isSelected: boolean;
  title: string;
  image?: string;
};
