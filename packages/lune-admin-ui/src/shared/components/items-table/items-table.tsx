import { type ComponentProps, type PropsWithChildren, useState } from 'react';
import {
  Badge,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  cn,
  Input,
  Small
} from '@lunejs/ui';
import { XIcon } from 'lucide-react';
import { Link } from 'react-router';

import { SpinnerLoader } from '../loader/spinner-loader';
import { ImagePlaceholder } from '../placeholders/image-placeholder';

const ItemsTableRoot = ({ children }: PropsWithChildren) => {
  return <Card className="pb-0 overflow-hidden">{children}</Card>;
};

const Header = ({ children }: PropsWithChildren) => {
  return <CardHeader>{children}</CardHeader>;
};

const HeaderTitle = ({ children, className }: PropsWithChildren & { className?: string }) => {
  return <CardTitle className={className}>{children}</CardTitle>;
};

const HeaderDescription = ({ children }: PropsWithChildren) => {
  return <CardDescription>{children}</CardDescription>;
};

const HeaderAction = ({ children }: PropsWithChildren) => {
  return <CardAction>{children}</CardAction>;
};

const Content = ({ children, isLoading }: PropsWithChildren & { isLoading: boolean }) => {
  return (
    <CardContent className="px-0">
      {isLoading && (
        <div className="w-full flex justify-center px-6">
          <SpinnerLoader />
        </div>
      )}

      {!isLoading && <div className="flex flex-col gap-4">{children}</div>}
    </CardContent>
  );
};

const Search = (props: ComponentProps<'input'>) => {
  return (
    <div className="px-6">
      <Input placeholder="Search..." {...props} />
    </div>
  );
};

const List = ({ children }: PropsWithChildren) => {
  return <div className="divide-y border-t">{children}</div>;
};

const ListEmpty = () => {
  return (
    <div className="flex justify-center py-8">
      <Small className="text-muted-foreground">No results</Small>
    </div>
  );
};

const ListItem = ({
  href,
  image,
  title,
  subtitle,
  enabled,
  onRemove
}: {
  href: string;
  image: string | undefined;
  title: string;
  subtitle?: string;
  enabled: boolean;
  onRemove: () => Promise<void>;
}) => {
  const [isRemoving, setIsRemoving] = useState(false);

  return (
    <article
      className={cn(
        'flex items-center justify-between px-6 py-2 hover:bg-muted/30',
        isRemoving && 'opacity-40'
      )}
    >
      <Link to={href} className="flex items-center gap-2 group">
        {image ? (
          <img className="w-10 h-10 object-cover rounded-md" src={image} />
        ) : (
          <ImagePlaceholder className="w-10 h-10" initial={title} />
        )}
        <div className="flex flex-col gap-1">
          <span className="group-hover:underline">{title}</span>
          {subtitle && <span className="text-muted-foreground text-sm">{subtitle}</span>}
        </div>
      </Link>
      <div className="flex items-center gap-4">
        <Badge variant={enabled ? 'default' : 'secondary'}>
          {enabled ? 'Published' : 'Unpublished'}
        </Badge>
        <button
          type="button"
          className="text-muted-foreground p-2 hover:bg-muted transition-colors rounded-sm cursor-pointer disabled:pointer-events-none"
          disabled={isRemoving}
          onClick={async () => {
            setIsRemoving(true);
            await onRemove();
            setIsRemoving(false);
          }}
        >
          {isRemoving ? <SpinnerLoader /> : <XIcon size={16} />}
        </button>
      </div>
    </article>
  );
};

const ItemsTable = Object.assign(ItemsTableRoot, {
  Header,
  HeaderTitle,
  HeaderDescription,
  HeaderAction,
  Content,
  Search,
  List,
  ListEmpty,
  ListItem
});

export { ItemsTable };
