import { clean, getFullName, isFirst, LunePrice } from '@lune/common';
import {
  ApplicationLevel,
  ApplicationMode,
  Asset,
  Customer,
  Fulfillment,
  type FulfillmentType,
  InStorePickupFulfillmentAddress,
  OptionValue,
  Order,
  OrderLine,
  Product,
  Shop,
  Variant,
} from '@lune/core';
import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
  pixelBasedPreset,
  render,
} from '@react-email/components';
import {
  EmailHeader,
  EmailHeaderButton,
  EmailHeaderImage,
  EmailHeaderSubtitle,
  EmailHeaderThumbnail,
  EmailHeaderTitle,
} from './shared/Header';
import { EmailFooter } from './shared/Footer';
import { OrderSummary } from './shared/order-summary';

const Component = ({
  shop,
  order,
  shippingDetails,
  customer,
  fulfillment,
  orderLines,
}: Props) => {
  const isShipping = fulfillment.type === 'SHIPPING';

  return (
    <Html>
      <Head />
      <Tailwind
        config={{
          presets: [pixelBasedPreset],
        }}
      >
        <Body className="mx-auto my-auto bg-white font-sans p-[32px]">
          <Preview>order {order.code as string}</Preview>
          <Container className="mx-auto max-w-[500px] w-full">
            <EmailHeader>
              <EmailHeaderImage
                src={shop.logo as string}
                width="40"
                height="37"
                alt={shop.name}
              />
              <EmailHeaderThumbnail className="mb-0">
                {order.code}
              </EmailHeaderThumbnail>
              <EmailHeaderTitle className="mt-0">
                {getFullName(clean(customer))}, your order is on the way
              </EmailHeaderTitle>
              <EmailHeaderSubtitle>
                {isShipping
                  ? `We're getting your order ready to be shipped. We will notify you when it has been
                sent.`
                  : `We're getting ready your order. We will notify you when it's ready to pickup`}
              </EmailHeaderSubtitle>
              <EmailHeaderSubtitle>
                {shippingDetails.carrier}: {shippingDetails.trackingCode}
              </EmailHeaderSubtitle>
              <EmailHeaderButton>View order</EmailHeaderButton>
            </EmailHeader>

            <OrderSummary
              fulfillment={fulfillment}
              order={order}
              orderLines={orderLines}
            />
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
  customer: Customer;
  order: Order;
  fulfillment: Fulfillment;
  shippingDetails: {
    trackingCode: string;
    carrier: string;
  };
  orderLines: {
    name: string;
    image: string;
    salePrice: string;
    priceBeforeDiscount?: string;
    optionValues: {
      id: string;
      name: string;
      optionName: string;
      metadata: Record<string, unknown>;
    }[];
  }[];
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
    updatedAt: new Date(),
  },
  order: {
    id: 'order-1',
    code: 'ORD-2024-001',
    state: 'PLACED' as any,
    total: 15000,
    subtotal: 14000,
    totalQuantity: 3,
    appliedDiscounts: [
      {
        code: 'SUMMER10',
        discountedAmount: 10000,
        applicationMode: 'CODE' as ApplicationMode,
        applicationLevel: 'ORDER' as ApplicationLevel,
      },
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
      stateCode: 'CA',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  customer: {
    id: 'customer-1',
    email: 'john@example.com',
    firstName: 'John',
    lastName: 'Doe',
    enabled: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  fulfillment: {
    id: 'fulfillment-1',
    type: 'SHIPPING' as FulfillmentType,
    amount: 10000,
    total: 10000,
    orderId: 'order-1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  shippingDetails: {
    trackingCode: '3786512735685',
    carrier: 'FedEx',
  },
  orderLines: [
    {
      name: 'Blusa Creta',
      optionValues: [
        { id: 'ov-1', name: 'Black', optionName: 'Color', metadata: {} },
        { id: 'ov-2', name: 'Large', optionName: 'Size', metadata: {} },
      ],
      image:
        'https://res.cloudinary.com/dnvp4s8pe/image/upload/v1756759391/vendyx/emfjhyrbuiyxdlcpv1aa.webp',
      salePrice: '$50.00',
      priceBeforeDiscount: '$78.00',
    },
    {
      name: 'Canvas Tote Bag',
      optionValues: [
        { id: 'ov-3', name: 'White', optionName: 'Color', metadata: {} },
      ],
      image:
        'https://res.cloudinary.com/dnvp4s8pe/image/upload/v1756759391/vendyx/bbt6jqsi1prmsujd52ea.webp',
      salePrice: '$40.00',
    },
  ],
} satisfies Props;

export default Component;

export const createOrderShippedEmail = (input: Props) =>
  render(<Component {...input} />);
