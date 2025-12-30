import { Column, Hr, Img, Row, Section, Text } from '@react-email/components';

import { isFirst, LunePrice } from '@lunejs/common';
import type { DeliveryMethodPickup, Fulfillment, FulfillmentLine } from '@lunejs/core';

import type { CommonEmailOrder } from './template.types';

export const OrderSummary = ({ order, fulfillment }: Props) => {
  const { deliveryMethod, deliveryMethodDetails } = order;

  const isShipping = deliveryMethod.type === 'SHIPPING';
  const pickupDetails = deliveryMethodDetails as DeliveryMethodPickup;

  const lines = fulfillment
    ? order.lines.filter(ol => fulfillment.lines.map(fl => fl.orderLineId).includes(ol.id))
    : order.lines;

  return (
    <Section className="mt-[32px]">
      <Text className="text-base font-semibold">Order summary</Text>
      {lines.map((line, i) => {
        const variant = line.variant;
        const product = line.variant.product;

        const image = variant.assets[0]?.source ?? product.assets[0]?.source;

        const hasDiscount = !!line.appliedDiscounts.length || !!variant.comparisonPrice;

        return (
          <Row style={{ marginTop: !isFirst(i) ? 24 : 0 }}>
            <Column className="w-[250px]">
              <Img src={image} alt={product.name} className="float-left" width="250px" />
            </Column>
            <Column className="align-top pl-3">
              <Row>
                <Column>
                  <Text className="m-0 text-[14px] leading-[2] font-medium">{product.name}</Text>
                </Column>
                <Column>
                  {hasDiscount ? (
                    <Text className="m-0 text-[14px] leading-[2] font-medium text-right">
                      <span className="line-through text-[#737373] mr-[4px]">
                        {LunePrice.format(line.lineSubtotal)}
                      </span>
                      <span className="text-red-600">{LunePrice.format(line.lineTotal)}</span>
                    </Text>
                  ) : (
                    <Text className="m-0 text-[14px] leading-[2] font-medium text-right">
                      {LunePrice.format(line.lineTotal)}
                    </Text>
                  )}
                </Column>
              </Row>
              <Text className="m-0 text-[14px] leading-[2] text-[#737373] font-medium">
                {variant.optionValues.map(ov => ov.name).join(' / ')}
              </Text>
            </Column>
          </Row>
        );
      })}
      <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
      {order.appliedDiscounts.map(discount => (
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
          <Text className="m-0 text-right text-[#737373]">{LunePrice.format(order.subtotal)}</Text>
        </Column>
      </Row>
      {isShipping && (
        <Row>
          <Column>
            <Text className="m-0 text-[#737373]">Shipment</Text>
          </Column>
          <Column>
            <Text className="m-0 text-right text-[#737373]">
              {LunePrice.format(deliveryMethod.total)}
            </Text>
          </Column>
        </Row>
      )}
      <Row className="mt-[24px]">
        <Column>
          <Text className="m-0 font-semibold">Total</Text>
        </Column>
        <Column>
          <Text className="m-0 text-right font-semibold">{LunePrice.format(order.total)}</Text>
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
          {pickupDetails.address.name}: {pickupDetails.address.streetLine1},{' '}
          {pickupDetails.address.city}, {pickupDetails.address.stateCode}{' '}
          {pickupDetails.address.postalCode}
        </Text>
      )}
    </Section>
  );
};

export type Props = {
  order: CommonEmailOrder;
  fulfillment?: Fulfillment & { lines: FulfillmentLine[] };
};
