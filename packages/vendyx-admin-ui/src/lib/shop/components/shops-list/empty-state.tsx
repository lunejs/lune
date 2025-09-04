import { Link } from 'react-router';

import { Button } from '../../../../../../vendyx-ui/dist';

export const ShopsListEmptyState = () => {
  return (
    <div className="text-center px-6 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="h4">You have no shops yet</h1>
        <p className="muted text-muted-foreground">Create a shop to start selling your products</p>
      </div>
      <Link to="/shops/new">
        <Button>Create a shop</Button>
      </Link>
    </div>
  );
};
