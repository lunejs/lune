import { ApplicationLevel, ApplicationMode, DeliveryMethodType, OrderState } from '@lune/core';

export const SHIPPING_ORDER = {
  id: 'order-1',
  code: 'ORD-2024-001',
  state: OrderState.Placed,
  total: 15000,
  subtotal: 14000,
  totalQuantity: 2,
  customerId: 'customer-1',
  appliedDiscounts: [
    {
      code: 'SUMMER10',
      discountedAmount: 1000,
      applicationMode: ApplicationMode.Code,
      applicationLevel: ApplicationLevel.Order
    }
  ],
  shippingAddress: {
    fullName: 'John Doe',
    streetLine1: '88 Colin P Kelly Jr Street',
    streetLine2: 'Apt 4B',
    city: 'San Francisco',
    postalCode: '94107',
    phoneNumber: '+1 555 123 4567',
    country: 'United States',
    countryCode: 'US',
    state: 'California',
    stateCode: 'CA'
  },
  createdAt: new Date(),
  updatedAt: new Date(),
  customer: {
    id: 'customer-1',
    email: 'john@example.com',
    firstName: 'John',
    lastName: 'Doe',
    enabled: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  deliveryMethod: {
    id: 'delivery-method-1',
    type: DeliveryMethodType.Shipping,
    amount: 1000,
    total: 1000,
    orderId: 'order-1',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  deliveryMethodShipping: {
    id: 'delivery-method-shipping-1',
    deliveryMethodId: 'delivery-method-1',
    method: 'Shipping method',
    shippingMethodId: '',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  lines: [
    {
      id: 'line-1',
      orderId: 'order-1',
      variantId: 'variant-1',
      quantity: 1,
      unitPrice: 7800,
      lineSubtotal: 7800,
      lineTotal: 5000,
      appliedDiscounts: [
        {
          code: 'SUMMER10',
          discountedAmount: 2800,
          applicationMode: 'CODE' as ApplicationMode,
          applicationLevel: 'LINE' as ApplicationLevel
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
      variant: {
        id: 'variant-1',
        productId: 'product-1',
        sku: 'T-SHIRT-BLK-L',
        stock: 50,
        salePrice: 5000,
        comparisonPrice: 7800,
        requiresShipping: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        assets: [
          {
            id: 'asset-1',
            filename: 'asset',
            ext: 'ext',
            mimeType: 'JPG',
            providerId: '',
            size: 12893,
            source: 'https://example.com/asset.webp',
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ],
        product: {
          id: 'product-1',
          name: 'T-Shirt',
          slug: 't-shirt',
          description: 'Elegant blouse',
          enabled: true,
          archived: false,
          maxSalePrice: 1000,
          minSalePrice: 1000,
          createdAt: new Date(),
          updatedAt: new Date(),
          assets: []
        },
        optionValues: [
          {
            id: 'ov-1',
            name: 'Black',
            optionId: 'opt-1',
            preset: null,
            order: 0,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: 'ov-2',
            name: 'Large',
            optionId: 'opt-2',
            order: 1,
            preset: null,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ]
      }
    },
    {
      id: 'line-2',
      orderId: 'order-1',
      variantId: 'variant-2',
      quantity: 1,
      unitPrice: 4000,
      lineSubtotal: 4000,
      lineTotal: 4000,
      appliedDiscounts: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      variant: {
        id: 'variant-2',
        productId: 'product-2',
        sku: 'TOTE-BAG-WHT',
        stock: 30,
        salePrice: 4000,
        comparisonPrice: null,
        requiresShipping: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        assets: [
          {
            id: 'asset-2',
            filename: 'asset',
            ext: 'ext',
            mimeType: 'JPG',
            providerId: '',
            size: 12893,
            source: 'https://example.com/asset.webp',
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ],
        product: {
          id: 'product-2',
          name: 'Canvas Tote Bag',
          slug: 'canvas-tote-bag',
          description: 'Stylish tote bag',
          enabled: true,
          archived: false,
          maxSalePrice: 1000,
          minSalePrice: 1000,
          createdAt: new Date(),
          updatedAt: new Date(),
          assets: []
        },
        optionValues: [
          {
            id: 'ov-3',
            name: 'White',
            optionId: 'opt-1',
            order: 0,
            preset: null,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ]
      }
    }
  ]
};

export const SHIPPING_ORDER_PAYLOAD_RESULT = {
  intent: 'CAPTURE',
  purchase_units: [
    {
      invoice_id: expect.any(String),
      items: [
        {
          sku: 'T-SHIRT-BLK-L',
          name: 'T-Shirt',
          quantity: '1',
          unit_amount: {
            value: '78',
            currency_code: 'USD'
          },
          category: 'PHYSICAL_GOODS',
          description: 'Black, Large'
        },
        {
          sku: 'TOTE-BAG-WHT',
          name: 'Canvas Tote Bag',
          quantity: '1',
          unit_amount: {
            value: '40',
            currency_code: 'USD'
          },
          category: 'PHYSICAL_GOODS',
          description: 'White'
        }
      ],
      amount: {
        value: '150',
        currency_code: 'USD',
        breakdown: {
          discount: {
            currency_code: 'USD',
            value: '10'
          },
          shipping: {
            currency_code: 'USD',
            value: '10'
          },
          item_total: {
            currency_code: 'USD',
            value: '140'
          }
        }
      }
    }
  ]
};
