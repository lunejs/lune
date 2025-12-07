import { PaymentState } from '@/persistence/entities/payment';
import type { PaymentMethodTable } from '@/persistence/entities/payment-method';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestHelper } from '@/tests/utils/test-helper';

import { ShopConstants } from './shop.fixtures';

export const PaymentMethodConstants = {
  CapturedID: TestHelper.generateUUID(),
  FailedID: TestHelper.generateUUID(),
  AuthorizedID: TestHelper.generateUUID(),
  DisabledID: TestHelper.generateUUID(),
  WithNonExistingHandler: TestHelper.generateUUID()
};

export class PaymentMethodFixtures implements Fixture<PaymentMethodTable> {
  table = Tables.PaymentMethod;

  async build(): Promise<Partial<PaymentMethodTable>[]> {
    return [
      {
        shop_id: ShopConstants.ID,
        id: PaymentMethodConstants.CapturedID,
        enabled: true,
        name: 'Stripe',
        handler: {
          code: 'test-payment-handler',
          args: {
            state: PaymentState.Captured
          }
        }
      },
      {
        shop_id: ShopConstants.ID,
        id: PaymentMethodConstants.FailedID,
        enabled: true,
        name: 'PayPal',
        handler: {
          code: 'test-payment-handler',
          args: {
            state: PaymentState.Failed
          }
        }
      },
      {
        shop_id: ShopConstants.ID,
        id: PaymentMethodConstants.AuthorizedID,
        name: '2 steps',
        handler: {
          code: 'test-payment-handler',
          args: {
            state: PaymentState.Authorized
          }
        }
      },
      {
        shop_id: ShopConstants.ID,
        id: PaymentMethodConstants.DisabledID,
        name: 'Cash (deprecated)',
        enabled: false,
        handler: {
          code: 'test-payment-handler',
          args: {
            state: PaymentState.Authorized
          }
        }
      },
      {
        shop_id: ShopConstants.ID,
        id: PaymentMethodConstants.WithNonExistingHandler,
        name: 'Very very old',
        handler: {
          code: 'random-non-existing-handler',
          args: {}
        }
      }
    ];
  }
}
