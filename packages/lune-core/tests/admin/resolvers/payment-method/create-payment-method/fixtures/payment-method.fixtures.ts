import type { PaymentMethodTable } from '@/persistence/entities/payment-method';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ShopConstants } from './shop.fixtures';

export const PaymentMethodConstants = {
  StripeID: TestUtils.generateUUID(),
  PaypalID: TestUtils.generateUUID(),
  DisabledID: TestUtils.generateUUID()
};

export class PaymentMethodFixtures implements Fixture<PaymentMethodTable> {
  table = Tables.PaymentMethod;

  async build(): Promise<Partial<PaymentMethodTable>[]> {
    return [
      {
        shop_id: ShopConstants.ID,
        id: PaymentMethodConstants.StripeID,
        enabled: true,
        name: 'Stripe',
        handler: {
          code: 'stripe-payment-handler',
          args: {
            apiKey: 'sk_test_123'
          }
        }
      },
      {
        shop_id: ShopConstants.ID,
        id: PaymentMethodConstants.PaypalID,
        enabled: true,
        name: 'PayPal',
        handler: {
          code: 'paypal-payment-handler',
          args: {
            clientId: 'paypal_client_123'
          }
        }
      },
      {
        shop_id: ShopConstants.ID,
        id: PaymentMethodConstants.DisabledID,
        enabled: false,
        name: 'Cash (deprecated)',
        handler: {
          code: 'cash-payment-handler',
          args: {}
        }
      }
    ];
  }
}
