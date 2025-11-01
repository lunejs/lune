import { type ComponentProps, type PropsWithChildren, useState } from 'react';
import { XIcon } from 'lucide-react';
import { Link } from 'react-router';

import {
  Badge,
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
  cn,
  Input,
  P
} from '@lune/ui';

import { SpinnerLoader } from '../loader/spinner-loader';
import { ImagePlaceholder } from '../placeholders/image-placeholder';

const ItemsTableRoot = ({ children }: PropsWithChildren) => {
  return <Card className="pb-0 overflow-hidden">{children}</Card>;
};

const Header = ({ children }: PropsWithChildren) => {
  return <CardHeader>{children}</CardHeader>;
};

const HeaderTitle = ({ children }: PropsWithChildren) => {
  return (
    <CardTitle className="col-start-1 row-span-2 row-start-1 self-start justify-self-start h-full flex items-center">
      {children}
    </CardTitle>
  );
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
      <P className="text-muted-foreground">No results</P>
    </div>
  );
};

const ListItem = ({
  href,
  image,
  title,
  enabled,
  onRemove
}: {
  href: string;
  image: string | undefined;
  title: string;
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
      <Link to={href} className="flex items-center gap-2 hover:underline">
        {image ? (
          <img className="w-10 h-10 object-cover rounded-md" src={image} />
        ) : (
          <ImagePlaceholder className="w-10 h-10" initial={title} />
        )}
        <span>{title}</span>
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
  HeaderAction,
  Content,
  Search,
  List,
  ListEmpty,
  ListItem
});

export { ItemsTable };
