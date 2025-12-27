import { StoreIcon, TagIcon, TruckIcon } from 'lucide-react';

import { isFirst, LunePrice } from '@lune/common';
import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  cn,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@lune/ui';

import {
  type CommonOrderFragment,
  type DeliveryMethodPickup,
  type DeliveryMethodShipping,
  DeliveryMethodType,
  DiscountApplicationLevel
} from '@/lib/api/types';
import { ImagePlaceholder } from '@/shared/components/placeholders/image-placeholder';

import { OrderStateBadge } from '../../status/order-state-badge';

export const OrderItemsTable = ({ order }: Props) => {
  const lines = order.lines.items;
  const { deliveryMethod, appliedDiscounts } = order;
  const subtotalBeforeDiscounts = lines.reduce((acc, line) => acc + line.lineTotal, 0);
  const deliveryMethodDiscounts = order.appliedDiscounts.filter(
    d => d.applicationLevel === DiscountApplicationLevel.DeliveryMethod
  );

  return (
    <Card>
      <CardHeader className="flex items-center flex-row justify-between space-y-0">
        <CardTitle>Products</CardTitle>
        <OrderStateBadge state={order.state} />
      </CardHeader>

      <CardContent>
        <Table>
          <TableCaption>Order breakdown.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-max text-nowrap">Product</TableHead>
              <TableHead className="w-max text-nowrap">Unit price</TableHead>
              <TableHead className="w-max text-nowrap">Quantity</TableHead>
              <TableHead className="w-max text-nowrap">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lines.map(line => {
              const { product, assets, optionValues } = line.variant ?? {};
              const productImage = product.assets.items[0]?.source;
              const variantImage = assets.items[0]?.source;

              const itemImage = variantImage ?? productImage;

              const lineDiscountsMsg = line.appliedDiscounts
                .map(d => `${d.code} (-$${LunePrice.format(d.discountedAmount)})`)
                .join(', ');

              return (
                <TableRow key={line.id}>
                  <TableCell className="flex items-center gap-2 w-max">
                    {itemImage ? (
                      <img
                        src={itemImage}
                        alt={product.name}
                        className="h-12 w-12 object-cover rounded-md"
                      />
                    ) : (
                      <ImagePlaceholder initial={product.name} />
                    )}
                    <div
                      className={cn('flex flex-col justify-between', optionValues.length && 'h-12')}
                    >
                      <span className="text-nowrap">{product.name}</span>
                      {/* {!deletedAt ? (
                        <Link href={productUrl}>
                          <span className="text-nowrap hover:underline">{product.name}</span>
                        </Link>
                      ) : (
                        <span className="text-nowrap">{product.name}</span>
                      )} */}
                      {Boolean(optionValues?.length) && (
                        <Badge variant="secondary" className="py-0 px-1 w-fit text-xs">
                          {optionValues?.map(v => v.name).join(' / ')}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{LunePrice.format(line.unitPrice)}</TableCell>
                  <TableCell>{line.quantity}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span>{LunePrice.format(line.lineTotal)}</span>
                      {!!line.appliedDiscounts.length && (
                        <Tooltip>
                          <TooltipTrigger>
                            <TagIcon size={16} className="text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>{lineDiscountsMsg}</TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}

            <TableRow className="border-transparent">
              <TableCell>Subtotal</TableCell>
              <TableCell>
                {order.totalQuantity} {order.totalQuantity === 1 ? 'Product' : 'Products'}
              </TableCell>
              <TableCell></TableCell>
              <TableCell>{LunePrice.format(subtotalBeforeDiscounts)}</TableCell>
            </TableRow>

            {appliedDiscounts.map((d, i) => (
              <TableRow key={d.code} className="border-transparent">
                <TableCell>{isFirst(i) && 'Discounts'}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <TagIcon size={16} />
                    <span>{d.code}</span>
                  </div>
                </TableCell>
                <TableCell></TableCell>
                <TableCell>-{LunePrice.format(d.discountedAmount)}</TableCell>
              </TableRow>
            ))}

            <TableRow className="border-transparent">
              <TableCell>Fulfillment</TableCell>
              <TableCell>
                {deliveryMethod?.type === DeliveryMethodType.Pickup ? (
                  <div className="flex items-center gap-1">
                    <StoreIcon size={16} />
                    {(deliveryMethod.details as DeliveryMethodPickup).location.name}
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <TruckIcon size={16} />
                    {(deliveryMethod?.details as DeliveryMethodShipping).method}
                  </div>
                )}
              </TableCell>
              <TableCell></TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <span>{LunePrice.format(deliveryMethod?.total ?? 0)}</span>
                  {!!deliveryMethodDiscounts.length && (
                    <Tooltip>
                      <TooltipTrigger>
                        <TagIcon size={16} className="text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        {deliveryMethodDiscounts
                          .map(d => `${d.code} (-$${LunePrice.format(d.discountedAmount)})`)
                          .join(', ')}
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
              </TableCell>
            </TableRow>

            <TableRow className="border-transparent">
              <TableCell className="font-semibold">Total</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell className="font-semibold">{LunePrice.format(order.total)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

type Props = {
  order: CommonOrderFragment;
};
