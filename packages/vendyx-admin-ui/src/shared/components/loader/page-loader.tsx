import { LoaderIcon } from 'lucide-react';

export const PageLoader = () => {
  return (
    <div className="w-full flex items-center justify-center h-full">
      <LoaderIcon size={24} className="animate-spin text-muted-foreground" />
    </div>
  );
};
