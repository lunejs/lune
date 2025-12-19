import { clean, getFullName, isFirst, LunePrice } from '@lune/common';
import {
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
  EmailHeaderTitle,
} from '../shared/Header';
import { EmailFooter } from '../shared/Footer';

const Component = ({
  shop,
  order,
  location,
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
              <EmailHeaderTitle>
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

            <Section className="mt-[32px]">
              <Text className="text-base font-semibold">Order summary</Text>
              {orderLines.map((line, i) => {
                return (
                  <Row style={{ marginTop: !isFirst(i) ? 24 : 0 }}>
                    <Column className="w-[250px]">
                      <Img
                        src={line.image}
                        alt={line.name}
                        className="float-left"
                        width="250px"
                      />
                    </Column>
                    <Column className="align-top pl-3">
                      <Row>
                        <Column>
                          <Text className="m-0 text-[14px] leading-[2] font-medium">
                            {line.name}
                          </Text>
                        </Column>
                        <Column>
                          {line.priceBeforeDiscount ? (
                            <Text className="m-0 text-[14px] leading-[2] font-medium text-right">
                              <span className="line-through text-[#737373] mr-[4px]">
                                {line.priceBeforeDiscount}
                              </span>
                              <span className="text-red-600">
                                {line.salePrice}
                              </span>
                            </Text>
                          ) : (
                            <Text className="m-0 text-[14px] leading-[2] font-medium text-right">
                              {line.salePrice}
                            </Text>
                          )}
                        </Column>
                      </Row>
                      <Text className="m-0 text-[14px] leading-[2] text-[#737373] font-medium">
                        {line.optionValues.map((ov) => ov.name).join(' / ')}
                      </Text>
                    </Column>
                  </Row>
                );
              })}
              <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
              {order.appliedDiscounts.map((discount) => (
                <Row>
                  <Column>
                    <Text className="m-0 text-[#737373]">{discount.code}</Text>
                  </Column>
                  <Column>
                    <Text className="m-0 text-right text-[#737373]">
                      {LunePrice.format(discount.discountedAmount)}
                    </Text>
                  </Column>
                </Row>
              ))}
              <Row>
                <Column>
                  <Text className="m-0 text-[#737373]">
                    {order.totalQuantity === 1
                      ? `${order.totalQuantity} Product`
                      : `${order.totalQuantity} Products`}
                  </Text>
                </Column>
                <Column>
                  <Text className="m-0 text-right text-[#737373]">
                    {LunePrice.format(order.subtotal)}
                  </Text>
                </Column>
              </Row>
              {isShipping && (
                <Row>
                  <Column>
                    <Text className="m-0 text-[#737373]">Shipment</Text>
                  </Column>
                  <Column>
                    <Text className="m-0 text-right text-[#737373]">
                      {LunePrice.format(fulfillment.total)}
                    </Text>
                  </Column>
                </Row>
              )}
              <Row className="mt-[24px]">
                <Column>
                  <Text className="m-0 font-semibold">Total</Text>
                </Column>
                <Column>
                  <Text className="m-0 text-right font-semibold">
                    {LunePrice.format(order.total)}
                  </Text>
                </Column>
              </Row>
            </Section>
            <Section className="mt-[24px]">
              <Text className="m-0 text-sm text-black font-semibold">
                {isShipping ? 'Shipping to' : 'Picking up at'}
              </Text>
              {isShipping ? (
                <Text className="m-0 text-[14px] text-[#737373]">
                  {order.shippingAddress?.streetLine1},{' '}
                  {order.shippingAddress?.city},{' '}
                  {order.shippingAddress?.stateCode}{' '}
                  {order.shippingAddress?.postalCode}
                </Text>
              ) : (
                <Text className="m-0 text-[14px] text-[#737373]">
                  {location?.name}: {location?.address.streetLine1},{' '}
                  {location?.address.city}, {location?.address.stateCode}{' '}
                  {location?.address.postalCode}
                </Text>
              )}
            </Section>
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
  location?: {
    name: string;
    address: InStorePickupFulfillmentAddress;
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
    appliedDiscounts: [],
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
    type: 'IN_STORE_PICKUP' as FulfillmentType,
    amount: 0,
    total: 0,
    orderId: 'order-1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  location: {
    name: 'Acme Store - Downtown',
    address: {
      name: 'Acme Store - Downtown',
      streetLine1: '123 Main Street',
      streetLine2: 'Suite 100',
      city: 'San Francisco',
      postalCode: '94102',
      phoneNumber: '+1 555 987 6543',
      country: 'United States',
      countryCode: 'US',
      state: 'California',
      stateCode: 'CA',
    },
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

export const createOrderPlacedEmail = (input: Props) =>
  render(<Component {...input} />);
