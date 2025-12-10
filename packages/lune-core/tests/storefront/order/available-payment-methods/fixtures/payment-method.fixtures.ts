import type { PaymentMethodTable } from '@/persistence/entities/payment-method';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ShopConstants } from './shop.fixtures';

export const PaymentMethodConstants = {
  EnabledID: TestUtils.generateUUID(),
  EnabledName: 'Stripe',

  EnabledOlderID: TestUtils.generateUUID(),
  EnabledOlderName: 'PayPal',

  DisabledID: TestUtils.generateUUID(),
  DisabledName: 'Cash'
};

export class PaymentMethodFixtures implements Fixture<PaymentMethodTable> {
  table = Tables.PaymentMethod;

  async build(): Promise<Partial<PaymentMethodTable>[]> {
    return [
      {
        shop_id: ShopConstants.ID,
        id: PaymentMethodConstants.EnabledOlderID,
        enabled: true,
        name: PaymentMethodConstants.EnabledOlderName,
        handler: { code: 'test-handler', args: {} },
        created_at: new Date('2024-01-01')
      },
      {
        shop_id: ShopConstants.ID,
        id: PaymentMethodConstants.EnabledID,
        enabled: true,
        name: PaymentMethodConstants.EnabledName,
        handler: { code: 'test-handler', args: {} },
        created_at: new Date('2024-06-01')
      },
      {
        shop_id: ShopConstants.ID,
        id: PaymentMethodConstants.DisabledID,
        enabled: false,
        name: PaymentMethodConstants.DisabledName,
        handler: { code: 'test-handler', args: {} },
        created_at: new Date('2024-03-01')
      }
    ];
  }
}
