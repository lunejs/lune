/**
 * Script to seed orders by simulating the real storefront API flow
 *
 * Usage:
 *   yarn seed:orders
 *
 * Configure VARIANT_IDS array below with the variant IDs you want to order.
 * Each variant will become an order line in a single order.
 *
 * The script will:
 * 1. Create order with the first variant
 * 2. Add remaining variants as additional order lines
 * 3. Add default customer
 * 4. Add default shipping address (if USE_PICKUP = false)
 * 5. Get available shipping/pickup methods and use the first one
 * 6. Get available payment methods and use the first one
 * 7. Add payment to finalize order
 */

const STOREFRONT_API_URL = 'http://localhost:4000/storefront-api';

// ============================================================================
// CONFIGURE YOUR ORDERS HERE
// ============================================================================

const API_KEY = 'LNSK_XRWTFMN99HV8X6RZZTA5WTHZ7EHPK2XKPF22TZMK';
const SHOP_ID = '99216796-99e7-4a95-9c93-e4736775bd73';

/**
 * Set to true for in-store pickup, false for shipping to address
 */
const USE_PICKUP = Math.random() > 0.5;

/**
 * Array of variant IDs to add to the order.
 * Each variant ID will become an order line in a single order.
 */
const VARIANT_IDS: string[] = [
  'cd5e0a8d-31a6-4f5c-ba7a-0f779bb23dc6',
  '8e44ff4e-2722-444e-90e5-383d5f3025c3',
  '5916cc75-66d5-473a-a7fd-f696432c3e1f'
];

/**
 * Default customer info
 */
const DEFAULT_CUSTOMER = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phoneNumber: '+1234567890'
};

/**
 * Default shipping address (only used when USE_PICKUP = false)
 */
const DEFAULT_ADDRESS = {
  fullName: 'Juan Pérez',
  streetLine1: 'Av. Reforma 123',
  streetLine2: 'Piso 4',
  city: 'Ciudad de México',
  postalCode: '06600',
  phoneNumber: '+525512345678',
  references: 'Edificio azul, tocar timbre',
  countryCode: 'MX',
  stateCode: 'CMX'
};

// ============================================================================
// GRAPHQL OPERATIONS
// ============================================================================

const CREATE_ORDER = `
  mutation CreateOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      order {
        id
        state
        total
        subtotal
      }
      apiErrors {
        code
        message
      }
    }
  }
`;

const ADD_LINE_TO_ORDER = `
  mutation AddLineToOrder($orderId: ID!, $input: CreateOrderLineInput!) {
    addLineToOrder(orderId: $orderId, input: $input) {
      order {
        id
        total
        subtotal
      }
      apiErrors {
        code
        message
      }
    }
  }
`;

const ADD_CUSTOMER = `
  mutation AddCustomerToOrder($orderId: ID!, $input: AddCustomerToOrderInput!) {
    addCustomerToOrder(orderId: $orderId, input: $input) {
      order {
        id
        customer {
          id
          email
        }
      }
      apiErrors {
        code
        message
      }
    }
  }
`;

const ADD_SHIPPING_ADDRESS = `
  mutation AddShippingAddressToOrder($orderId: ID!, $input: CreateOrderAddressInput!) {
    addShippingAddressToOrder(orderId: $orderId, input: $input) {
      order {
        id
        shippingAddress {
          fullName
          city
        }
      }
      apiErrors {
        code
        message
      }
    }
  }
`;

const GET_SHIPPING_METHODS = `
  query AvailableShippingMethods($orderId: ID!) {
    availableShippingMethods(orderId: $orderId) {
      id
      name
      pricePreview
    }
  }
`;

const ADD_SHIPPING_FULFILLMENT = `
  mutation AddShippingFulfillmentToOrder($orderId: ID!, $input: AddShippingFulfillmentInput!) {
    addShippingFulfillmentToOrder(orderId: $orderId, input: $input) {
      order {
        id
        total
        fulfillment {
          id
          type
          amount
        }
      }
      apiErrors {
        code
        message
      }
    }
  }
`;

const GET_PICKUP_LOCATIONS = `
  query AvailablePickupLocations {
    availablePickupLocations {
      id
      name
    }
  }
`;

const ADD_PICKUP_FULFILLMENT = `
  mutation AddInStorePickupFulfillmentToOrder($orderId: ID!, $input: AddInStorePickupFulfillmentInput!) {
    addInStorePickupFulfillmentToOrder(orderId: $orderId, input: $input) {
      order {
        id
        total
        fulfillment {
          id
          type
          amount
        }
      }
      apiErrors {
        code
        message
      }
    }
  }
`;

const GET_PAYMENT_METHODS = `
  query AvailablePaymentMethods {
    availablePaymentMethods {
      id
      name
    }
  }
`;

const ADD_PAYMENT = `
  mutation AddPaymentToOrder($orderId: ID!, $input: AddPaymentToOrderInput!) {
    addPaymentToOrder(orderId: $orderId, input: $input) {
      order {
        id
        code
        state
        total
        placedAt
      }
      apiErrors {
        code
        message
      }
    }
  }
`;

// ============================================================================
// TYPES
// ============================================================================

interface GraphQLResponse {
  data?: Record<string, unknown>;
  errors?: { message: string }[];
}

interface ShippingMethod {
  id: string;
  name: string;
  pricePreview: number;
}

interface PickupLocation {
  id: string;
  name: string;
}

interface PaymentMethod {
  id: string;
  name: string;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

async function graphqlRequest<T = Record<string, unknown>>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  const response = await fetch(STOREFRONT_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      x_lune_storefront_api_key: API_KEY,
      x_lune_shop_id: SHOP_ID
    },
    body: JSON.stringify({ query, variables })
  });

  const result: GraphQLResponse = await response.json();

  if (result.errors) {
    throw new Error(`GraphQL Error: ${JSON.stringify(result.errors, null, 2)}`);
  }

  return result.data as T;
}

async function createOrder(variantId: string): Promise<string> {
  console.log(`\n📦 Creating order with variant: ${variantId}`);

  const data = await graphqlRequest<{
    createOrder: {
      order: { id: string };
      apiErrors: { code: string; message: string }[];
    };
  }>(CREATE_ORDER, {
    input: {
      line: {
        productVariantId: variantId,
        quantity: 1
      }
    }
  });

  if (data.createOrder.apiErrors.length > 0) {
    throw new Error(`Create order failed: ${JSON.stringify(data.createOrder.apiErrors)}`);
  }

  const orderId = data.createOrder.order.id;
  console.log(`   ✓ Order created: ${orderId}`);
  return orderId;
}

async function addLineToOrder(orderId: string, variantId: string): Promise<void> {
  console.log(`   📦 Adding line with variant: ${variantId}`);

  const data = await graphqlRequest<{
    addLineToOrder: {
      order: { id: string };
      apiErrors: { code: string; message: string }[];
    };
  }>(ADD_LINE_TO_ORDER, {
    orderId,
    input: {
      productVariantId: variantId,
      quantity: 1
    }
  });

  if (data.addLineToOrder.apiErrors.length > 0) {
    throw new Error(`Add line failed: ${JSON.stringify(data.addLineToOrder.apiErrors)}`);
  }

  console.log(`   ✓ Line added`);
}

async function addCustomer(orderId: string): Promise<void> {
  console.log(`👤 Adding customer...`);

  const data = await graphqlRequest<{
    addCustomerToOrder: {
      apiErrors: { code: string; message: string }[];
    };
  }>(ADD_CUSTOMER, {
    orderId,
    input: DEFAULT_CUSTOMER
  });

  if (data.addCustomerToOrder.apiErrors.length > 0) {
    throw new Error(`Add customer failed: ${JSON.stringify(data.addCustomerToOrder.apiErrors)}`);
  }

  console.log(`   ✓ Customer added: ${DEFAULT_CUSTOMER.email}`);
}

async function addShippingAddress(orderId: string): Promise<void> {
  console.log(`📍 Adding shipping address...`);

  const data = await graphqlRequest<{
    addShippingAddressToOrder: {
      apiErrors: { code: string; message: string }[];
    };
  }>(ADD_SHIPPING_ADDRESS, {
    orderId,
    input: DEFAULT_ADDRESS
  });

  if (data.addShippingAddressToOrder.apiErrors.length > 0) {
    throw new Error(
      `Add shipping address failed: ${JSON.stringify(data.addShippingAddressToOrder.apiErrors)}`
    );
  }

  console.log(`   ✓ Address added: ${DEFAULT_ADDRESS.city}, ${DEFAULT_ADDRESS.stateCode}`);
}

async function addShippingMethod(orderId: string): Promise<void> {
  console.log(`🚚 Getting available shipping methods...`);

  const methodsData = await graphqlRequest<{
    availableShippingMethods: ShippingMethod[];
  }>(GET_SHIPPING_METHODS, { orderId });

  const methods = methodsData.availableShippingMethods;

  if (!methods || methods.length === 0) {
    throw new Error(
      'No shipping methods available. Make sure you have shipping methods configured for this zone.'
    );
  }

  console.log(`   Found ${methods.length} method(s):`);
  methods.forEach(m => console.log(`     - ${m.name} ($${(m.pricePreview / 100).toFixed(2)})`));

  const selectedMethod = methods[0];
  console.log(`   Using: ${selectedMethod.name}`);

  const data = await graphqlRequest<{
    addShippingFulfillmentToOrder: {
      apiErrors: { code: string; message: string }[];
    };
  }>(ADD_SHIPPING_FULFILLMENT, {
    orderId,
    input: { methodId: selectedMethod.id }
  });

  if (data.addShippingFulfillmentToOrder.apiErrors.length > 0) {
    throw new Error(
      `Add shipping failed: ${JSON.stringify(data.addShippingFulfillmentToOrder.apiErrors)}`
    );
  }

  console.log(`   ✓ Shipping method set`);
}

async function addPickupFulfillment(orderId: string): Promise<void> {
  console.log(`🏪 Getting available pickup locations...`);

  const locationsData = await graphqlRequest<{
    availablePickupLocations: PickupLocation[];
  }>(GET_PICKUP_LOCATIONS, {});

  const locations = locationsData.availablePickupLocations;

  if (!locations || locations.length === 0) {
    throw new Error(
      'No pickup locations available. Make sure you have locations configured with in-store pickup enabled.'
    );
  }

  console.log(`   Found ${locations.length} location(s):`);
  locations.forEach(l => console.log(`     - ${l.name}`));

  const selectedLocation = locations[0];
  console.log(`   Using: ${selectedLocation.name}`);

  const data = await graphqlRequest<{
    addInStorePickupFulfillmentToOrder: {
      apiErrors: { code: string; message: string }[];
    };
  }>(ADD_PICKUP_FULFILLMENT, {
    orderId,
    input: { locationId: selectedLocation.id }
  });

  if (data.addInStorePickupFulfillmentToOrder.apiErrors.length > 0) {
    throw new Error(
      `Add pickup failed: ${JSON.stringify(data.addInStorePickupFulfillmentToOrder.apiErrors)}`
    );
  }

  console.log(`   ✓ Pickup location set`);
}

async function addPayment(orderId: string): Promise<string> {
  console.log(`💳 Getting available payment methods...`);

  const methodsData = await graphqlRequest<{
    availablePaymentMethods: PaymentMethod[];
  }>(GET_PAYMENT_METHODS, {});

  const methods = methodsData.availablePaymentMethods;

  if (!methods || methods.length === 0) {
    throw new Error('No payment methods available. Make sure you have payment methods configured.');
  }

  console.log(`   Found ${methods.length} method(s):`);
  methods.forEach(m => console.log(`     - ${m.name}`));

  const selectedMethod = methods[0];
  console.log(`   Using: ${selectedMethod.name}`);

  const data = await graphqlRequest<{
    addPaymentToOrder: {
      order: { id: string; code: string; state: string; total: number };
      apiErrors: { code: string; message: string }[];
    };
  }>(ADD_PAYMENT, {
    orderId,
    input: { methodId: selectedMethod.id }
  });

  if (data.addPaymentToOrder.apiErrors.length > 0) {
    throw new Error(`Add payment failed: ${JSON.stringify(data.addPaymentToOrder.apiErrors)}`);
  }

  const order = data.addPaymentToOrder.order;
  console.log(`   ✓ Payment added`);
  console.log(`\n✅ Order completed!`);
  console.log(`   Code: ${order.code}`);
  console.log(`   State: ${order.state}`);
  console.log(`   Total: $${(order.total / 100).toFixed(2)}`);

  return order.code;
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  console.log('🛒 Lune Order Seeder\n');
  console.log('='.repeat(50));

  if (VARIANT_IDS.length === 0) {
    console.error('\n❌ No variant IDs configured!');
    console.error('\nEdit the VARIANT_IDS array in this file to add variant IDs.');
    console.error('\nTo find variant IDs, you can run:');
    console.error('  SELECT v.id, p.name, v.sku FROM variant v');
    console.error('  JOIN product p ON p.id = v.product_id');
    console.error("  WHERE v.shop_id = 'your-shop-id'");
    process.exit(1);
  }

  console.log(`Shop ID: ${SHOP_ID}`);
  console.log(`API Key: ${API_KEY.substring(0, 12)}...`);
  console.log(`Fulfillment: ${USE_PICKUP ? '🏪 In-store pickup' : '🚚 Shipping'}`);
  console.log(`Order lines: ${VARIANT_IDS.length}`);

  console.log(`\n${'─'.repeat(50)}`);

  try {
    // Create order with first variant
    const orderId = await createOrder(VARIANT_IDS[0]);

    // Add remaining variants as additional lines
    if (VARIANT_IDS.length > 1) {
      console.log(`\n📦 Adding ${VARIANT_IDS.length - 1} additional line(s)...`);
      for (let i = 1; i < VARIANT_IDS.length; i++) {
        await addLineToOrder(orderId, VARIANT_IDS[i]);
      }
    }

    await addCustomer(orderId);

    if (USE_PICKUP) {
      await addPickupFulfillment(orderId);
    } else {
      await addShippingAddress(orderId);
      await addShippingMethod(orderId);
    }

    const orderCode = await addPayment(orderId);

    console.log(`\n${'='.repeat(50)}`);
    console.log(`\n🎉 Done! Created order: ${orderCode}`);
    console.log(`   Lines: ${VARIANT_IDS.length}`);
  } catch (err) {
    console.error(`\n❌ Failed to create order: ${err}`);
    process.exit(1);
  }
}

main().catch(err => {
  console.error('\n❌ Fatal error:', err);
  process.exit(1);
});
