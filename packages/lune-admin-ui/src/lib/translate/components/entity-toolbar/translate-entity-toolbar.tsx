import { Button, H4 } from '@lune/ui';

export const TranslateEntityToolbar = ({ title, image }: Props) => {
  return (
    <header className="flex items-center justify-between w-full p-4 border-b">
      <div className="flex items-center gap-3">
        <img src={image} alt={title} className="w-9 h-9 rounded-sm object-cover" />
        <H4>{title}</H4>
      </div>
      <div className="flex items-center gap-3">
        <Button variant={'outline'}>Cancel</Button>
        <Button>Save</Button>
      </div>
    </header>
  );
};

type Props = {
  image: string;
  title: string;
};
