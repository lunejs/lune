import { isFirst, LunePrice } from '@lune/common';
import {
  Customer,
  Fulfillment,
  InStorePickupFulfillmentAddress,
  Order,
  Shop,
} from '@lune/core';
import { Column, Hr, Img, Row, Section, Text } from '@react-email/components';

export const OrderSummary = ({
  order,
  orderLines,
  fulfillment,
  location,
}: Props) => {
  const isShipping = fulfillment.type === 'SHIPPING';

  return (
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
                      <span className="text-red-600">{line.salePrice}</span>
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
              -{LunePrice.format(discount.discountedAmount)}
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

      <Text className="m-0 text-sm text-black font-semibold mt-[24px]">
        {isShipping ? 'Shipping to' : 'Picking up at'}
      </Text>
      {isShipping ? (
        <Text className="m-0 text-[14px] text-[#737373]">
          {order.shippingAddress?.streetLine1}, {order.shippingAddress?.city},{' '}
          {order.shippingAddress?.stateCode} {order.shippingAddress?.postalCode}
        </Text>
      ) : (
        <Text className="m-0 text-[14px] text-[#737373]">
          {location?.name}: {location?.address.streetLine1},{' '}
          {location?.address.city}, {location?.address.stateCode}{' '}
          {location?.address.postalCode}
        </Text>
      )}
    </Section>
  );
};

export type Props = {
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
