import { Form } from '@lune/ui';

import {
  ArgComponent,
  ArgEntity,
  type CommonDiscountFragment,
  type DiscountHandler
} from '@/lib/api/types';
import { DetailsPageLayout } from '@/shared/components/layout/details-page-layout';

import { DiscountActions } from './actions/discount-actions';
import { DiscountArgComponent } from './args/discount-arg-component';
import { DiscountArgEntitySelector } from './args/discount-arg-entity-selector';
import { DiscountDurationCard } from './cards/discount-duration-card';
import { DiscountGeneralCard } from './cards/discount-general-card';
import { DiscountStatusCard } from './cards/discount-status-card';
import { DiscountDetailsSubmitButton } from './use-form/submit-button';
import { useDiscountDetailsForm } from './use-form/use-form';

export const DiscountDetails = ({ discount, handler }: Props) => {
  const form = useDiscountDetailsForm(handler, discount ?? null);

  return (
    <Form {...form}>
      <form onSubmit={form.onSubmit}>
        <DetailsPageLayout>
          <DetailsPageLayout.Header>
            <DetailsPageLayout.Title>
              {discount ? discount.code : 'Create discount'}
            </DetailsPageLayout.Title>
            <DetailsPageLayout.Actions>
              {discount && <DiscountActions discount={discount} />}
              <DiscountDetailsSubmitButton />
            </DetailsPageLayout.Actions>
          </DetailsPageLayout.Header>

          <DetailsPageLayout.Content>
            <div className="col-span-4 flex flex-col gap-6">
              <DiscountGeneralCard />
              <DiscountDurationCard />
              <DiscountArgEntitySelector entity={ArgEntity.Variant} />
              <DiscountArgComponent component={ArgComponent.DiscountOrderRequirements} />
            </div>
            <div className="col-span-2 flex flex-col gap-6">
              <DiscountStatusCard />
            </div>
          </DetailsPageLayout.Content>
        </DetailsPageLayout>
      </form>
    </Form>
  );
};

type Props = {
  discount?: CommonDiscountFragment | null;
  handler: DiscountHandler;
};
