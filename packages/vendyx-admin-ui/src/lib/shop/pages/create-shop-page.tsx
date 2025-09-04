import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../../vendyx-ui/dist';

import { FloatingLayout } from '@/lib/shared/components/layout/floating-layout';

import { CreateShopForm } from '../components/create-shop/create-shop-form';

export const CreateShopPage = () => {
  return (
    <FloatingLayout>
      <Card className="max-w-[418px] w-full mx-auto">
        <CardHeader>
          <CardTitle>Create shop</CardTitle>
          <CardDescription>Enter your shop details to start selling</CardDescription>
        </CardHeader>
        <CardContent>
          <CreateShopForm />
        </CardContent>
      </Card>
    </FloatingLayout>
  );
};
