import {
  Body,
  Container,
  Head,
  Html,
  pixelBasedPreset,
  Preview,
  render,
  Tailwind
} from '@react-email/components';

import { clean, getFullName } from '@lune/common';
import type {
  ApplicationLevel,
  ApplicationMode,
  FulfillmentType,
  OrderState,
  ShippingFulfillment,
  Shop
} from '@lune/core';

import { EmailFooter } from './shared/Footer';
import {
  EmailHeader,
  EmailHeaderButton,
  EmailHeaderImage,
  EmailHeaderSubtitle,
  EmailHeaderThumbnail,
  EmailHeaderTitle
} from './shared/Header';
import { OrderSummary } from './shared/order-summary';
import type { CommonEmailOrder } from './shared/template.types';

const Component = ({ shop, order }: Props) => {
  const { fulfillment, customer } = order;

  const isShipping = fulfillment.type === 'SHIPPING';

  return (
    <Html>
      <Head />
      <Tailwind
        config={{
          presets: [pixelBasedPreset]
        }}
      >
        <Body className="mx-auto my-auto bg-white font-sans p-[32px]">
          <Preview>order {order.code as string}</Preview>
          <Container className="mx-auto max-w-[500px] w-full">
            <EmailHeader>
              <EmailHeaderImage src={shop.logo as string} width="40" height="37" alt={shop.name} />
              <EmailHeaderThumbnail className="mb-0">{order.code}</EmailHeaderThumbnail>
              <EmailHeaderTitle className="mt-0">
                {getFullName(clean(customer))}, thanks for your purchase
              </EmailHeaderTitle>
              <EmailHeaderSubtitle>
                {isShipping
                  ? `We're getting your order ready to be shipped. We will notify you when it has been
                sent.`
                  : `We're getting ready your order. We will notify you when it's ready to pickup`}
              </EmailHeaderSubtitle>
              <EmailHeaderButton>View order</EmailHeaderButton>
            </EmailHeader>

            <OrderSummary order={order} />
            <EmailFooter>
              {shop.name} ・88 Colin P Kelly Jr Street ・San Francisco, CA 94107
            </EmailFooter>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export type Props = {
  shop: Shop;
  order: CommonEmailOrder;
};

Component.PreviewProps = {
  shop: {
    id: 'shop-1',
    name: 'Acme Store',
    slug: 'acme-store',
    storefrontApiKey: 'key',
    email: 'contact@acme.com',
    phoneNumber: '+1 555 123 4567',
    logo: 'https://res.cloudinary.com/dnvp4s8pe/image/upload/v1766093488/yhvbtqvleoexe82d4twm.png',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  order: {
    id: 'order-1',
    code: 'ORD-2024-001',
    state: 'PLACED' as OrderState,
    total: 15000,
    subtotal: 14000,
    totalQuantity: 2,
    customerId: 'customer-1',
    appliedDiscounts: [
      {
        code: 'SUMMER10',
        discountedAmount: 1000,
        applicationMode: 'CODE' as ApplicationMode,
        applicationLevel: 'ORDER' as ApplicationLevel
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
    fulfillment: {
      id: 'fulfillment-1',
      type: 'SHIPPING' as FulfillmentType,
      amount: 1000,
      total: 1000,
      orderId: 'order-1',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    fulfillmentDetails: {
      id: 'shipping-details-1',
      fulfillmentId: 'fulfillment-1',
      method: 'Shipping method',
      shippingMethodId: '',
      createdAt: new Date(),
      updatedAt: new Date()
    } satisfies ShippingFulfillment,
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
          sku: 'BLUSA-CRETA-BLK-L',
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
              source:
                'https://res.cloudinary.com/dnvp4s8pe/image/upload/v1756759391/vendyx/emfjhyrbuiyxdlcpv1aa.webp',
              createdAt: new Date(),
              updatedAt: new Date()
            }
          ],
          product: {
            id: 'product-1',
            name: 'Blusa Creta',
            slug: 'blusa-creta',
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
              source:
                'https://res.cloudinary.com/dnvp4s8pe/image/upload/v1756759391/vendyx/bbt6jqsi1prmsujd52ea.webp',
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
  }
} satisfies Props;

export default Component;

export const createOrderPlacedEmail = (input: Props) => render(<Component {...input} />);
