import {
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@lunejs/ui';
import { PlusIcon } from 'lucide-react';
import { Link } from 'react-router';

import { FloatingLayout } from '@/shared/components/layout/floating-layout';

import { ShopsList } from '../components/shops-list/shops-list';
import { useGetShops } from '../hooks/use-get-shops';

export const ShopsPage = () => {
  const { isLoading, shops } = useGetShops();

  return (
    <FloatingLayout>
      <Card className="max-w-[418px] w-full mx-auto">
        <CardHeader>
          <CardTitle>Shops</CardTitle>
          <CardDescription>Welcome back</CardDescription>
          <CardAction className="h-full flex items-center">
            <Link to="/shops/new">
              <Button variant="outline">
                <PlusIcon size={16} /> Create Shop
              </Button>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col px-0">
          <ShopsList shops={shops} isLoading={isLoading} />
        </CardContent>
      </Card>
    </FloatingLayout>
  );
};
