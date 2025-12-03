import { Button } from '@lune/ui';

import type { DiscountHandler } from '@/lib/api/types';
import { DetailsPageLayout } from '@/shared/components/layout/details-page-layout';

export const DiscountDetails = ({ handler }: Props) => {
  return (
    <DetailsPageLayout>
      <DetailsPageLayout.Header>
        <DetailsPageLayout.Title>Create discount</DetailsPageLayout.Title>
        <DetailsPageLayout.Actions>
          <Button>Save</Button>
        </DetailsPageLayout.Actions>
      </DetailsPageLayout.Header>

      <DetailsPageLayout.Content>
        <h1>Hi</h1>
      </DetailsPageLayout.Content>
    </DetailsPageLayout>
  );
};

type Props = {
  handler: DiscountHandler;
};
