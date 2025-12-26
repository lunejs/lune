import type { OrderListInput } from '@/api/shared/types/graphql';
import type { Transaction } from '@/persistence/connection/connection';
import type { Asset } from '@/persistence/entities/asset';
import type { Customer } from '@/persistence/entities/customer';
import type { DeliveryMethod, DeliveryMethodType } from '@/persistence/entities/delivery-method';
import type { DeliveryMethodPickup } from '@/persistence/entities/delivery-method-pickup';
import type { DeliveryMethodShipping } from '@/persistence/entities/delivery-method-shipping';
import type { ID } from '@/persistence/entities/entity';
import type { OptionValue } from '@/persistence/entities/option_value';
import type { OptionValuePreset } from '@/persistence/entities/option-value-preset';
import { type Order, OrderState, type OrderTable } from '@/persistence/entities/order';
import type { OrderLine } from '@/persistence/entities/order-line';
import type { Product } from '@/persistence/entities/product';
import type { Variant } from '@/persistence/entities/variant';
import { OrderFilter } from '@/persistence/filters/order.filter';
import { AssetSerializer } from '@/persistence/serializers/asset.serializer';
import { CustomerSerializer } from '@/persistence/serializers/customer.serializer';
import { DeliveryMethodSerializer } from '@/persistence/serializers/delivery-method.serializer';
import { DeliveryMethodPickupSerializer } from '@/persistence/serializers/delivery-method-pickup.serializer';
import { DeliveryMethodShippingSerializer } from '@/persistence/serializers/delivery-method-shipping.serializer';
import { OptionValueSerializer } from '@/persistence/serializers/option-value.serializer';
import { OptionValuePresetSerializer } from '@/persistence/serializers/option-value-preset.serializer';
import { OrderSerializer } from '@/persistence/serializers/order.serializer';
import { OrderLineSerializer } from '@/persistence/serializers/order_line.serializer';
import { ProductSerializer } from '@/persistence/serializers/product.serializer';
import { VariantSerializer } from '@/persistence/serializers/variant.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';

export class OrderRepository extends Repository<Order, OrderTable> {
  constructor(trx: Transaction) {
    super(Tables.Order, trx, new OrderSerializer());
  }

  async findByFilters(input: OrderListInput) {
    const query = this.q();

    const result = await new OrderFilter(query)
      .applyFilters(input.filters ?? {})
      .applyPagination(input)
      .applySort()
      .build();

    return result.map(r => this.serializer.deserialize(r) as Order);
  }

  async countByFilters(filters: OrderListInput['filters']) {
    const query = this.q();

    new OrderFilter(query).applyFilters(filters ?? {});

    const [{ count }] = await query.count({ count: '*' });

    return Number(count);
  }

  async countPlaced(): Promise<number> {
    const [{ count }] = await this.trx(Tables.Order)
      .whereNot('state', OrderState.Modifying)
      .count('* as count');

    return Number(count);
  }

  // TODO (URGENT): Fix after migration for new fulfillments
  async findOneWithDetails(orderId: ID): Promise<OrderWithDetails | null> {
    // Serializers
    const orderSerializer = new OrderSerializer();
    const customerSerializer = new CustomerSerializer();
    const fulfillmentSerializer = new DeliveryMethodSerializer();
    const shippingFulfillmentSerializer = new DeliveryMethodShippingSerializer();
    const inStorePickupFulfillmentSerializer = new DeliveryMethodPickupSerializer();
    const orderLineSerializer = new OrderLineSerializer();
    const variantSerializer = new VariantSerializer();
    const productSerializer = new ProductSerializer();
    const assetSerializer = new AssetSerializer();
    const optionValueSerializer = new OptionValueSerializer();
    const optionValuePresetSerializer = new OptionValuePresetSerializer();

    // ============ QUERY 1: Order + Customer + Fulfillment + Details ============
    const orderRow = await this.trx
      .from({ o: Tables.Order })
      .leftJoin({ c: Tables.Customer }, 'c.id', 'o.customer_id')
      .leftJoin({ f: Tables.DeliveryMethod }, 'f.order_id', 'o.id')
      .leftJoin({ sf: Tables.DeliveryMethodShipping }, 'sf.fulfillment_id', 'f.id')
      .leftJoin({ pf: Tables.DeliveryMethodPickup }, 'pf.fulfillment_id', 'f.id')
      .select(
        // Order
        'o.id as o_id',
        'o.created_at as o_created_at',
        'o.updated_at as o_updated_at',
        'o.code as o_code',
        'o.state as o_state',
        'o.total as o_total',
        'o.subtotal as o_subtotal',
        'o.total_quantity as o_total_quantity',
        'o.applied_discounts as o_applied_discounts',
        'o.placed_at as o_placed_at',
        'o.completed_at as o_completed_at',
        'o.shipping_address as o_shipping_address',
        'o.customer_id as o_customer_id',
        // Customer
        'c.id as c_id',
        'c.created_at as c_created_at',
        'c.updated_at as c_updated_at',
        'c.email as c_email',
        'c.first_name as c_first_name',
        'c.last_name as c_last_name',
        'c.phone_number as c_phone_number',
        'c.enabled as c_enabled',
        // Fulfillment
        'f.id as f_id',
        'f.created_at as f_created_at',
        'f.updated_at as f_updated_at',
        'f.type as f_type',
        'f.amount as f_amount',
        'f.total as f_total',
        'f.order_id as f_order_id',
        // ShippingFulfillment
        'sf.id as sf_id',
        'sf.created_at as sf_created_at',
        'sf.updated_at as sf_updated_at',
        'sf.method as sf_method',
        'sf.tracking_code as sf_tracking_code',
        'sf.carrier as sf_carrier',
        'sf.shipped_at as sf_shipped_at',
        'sf.delivered_at as sf_delivered_at',
        'sf.fulfillment_id as sf_fulfillment_id',
        'sf.shipping_method_id as sf_shipping_method_id',
        // InStorePickupFulfillment
        'pf.id as pf_id',
        'pf.created_at as pf_created_at',
        'pf.updated_at as pf_updated_at',
        'pf.address as pf_address',
        'pf.ready_at as pf_ready_at',
        'pf.picked_up_at as pf_picked_up_at',
        'pf.fulfillment_id as pf_fulfillment_id',
        'pf.location_id as pf_location_id'
      )
      .where('o.id', orderId)
      .first();

    if (!orderRow) return null;

    // ============ QUERY 2: Lines + Variant + Product ============
    const lineRows = await this.trx
      .from({ ol: Tables.OrderLine })
      .innerJoin({ v: Tables.Variant }, 'v.id', 'ol.variant_id')
      .innerJoin({ p: Tables.Product }, 'p.id', 'v.product_id')
      .select(
        // OrderLine
        'ol.id as ol_id',
        'ol.created_at as ol_created_at',
        'ol.updated_at as ol_updated_at',
        'ol.unit_price as ol_unit_price',
        'ol.line_subtotal as ol_line_subtotal',
        'ol.line_total as ol_line_total',
        'ol.quantity as ol_quantity',
        'ol.applied_discounts as ol_applied_discounts',
        'ol.variant_id as ol_variant_id',
        'ol.order_id as ol_order_id',
        // Variant
        'v.id as v_id',
        'v.created_at as v_created_at',
        'v.updated_at as v_updated_at',
        'v.deleted_at as v_deleted_at',
        'v.sale_price as v_sale_price',
        'v.comparison_price as v_comparison_price',
        'v.cost_per_unit as v_cost_per_unit',
        'v.stock as v_stock',
        'v.sku as v_sku',
        'v.requires_shipping as v_requires_shipping',
        'v.weight as v_weight',
        'v.dimensions as v_dimensions',
        'v.product_id as v_product_id',
        // Product
        'p.id as p_id',
        'p.created_at as p_created_at',
        'p.updated_at as p_updated_at',
        'p.deleted_at as p_deleted_at',
        'p.name as p_name',
        'p.slug as p_slug',
        'p.description as p_description',
        'p.enabled as p_enabled',
        'p.archived as p_archived',
        'p.min_sale_price as p_min_sale_price',
        'p.max_sale_price as p_max_sale_price'
      )
      .where('ol.order_id', orderId);

    const variantIds = lineRows.map(r => r.v_id);
    const productIds = [...new Set(lineRows.map(r => r.p_id))];

    // ============ QUERY 3: Assets (variant + product) ============
    type AssetRow = {
      variant_id?: string;
      product_id?: string;
      id: string;
      created_at: Date;
      updated_at: Date;
      filename: string;
      ext: string;
      source: string;
      provider_id: string;
      mime_type: string;
      size: number;
    };

    const [variantAssetRows, productAssetRows]: [AssetRow[], AssetRow[]] = await Promise.all([
      variantIds.length > 0
        ? this.trx
            .from({ va: Tables.VariantAsset })
            .innerJoin({ a: Tables.Asset }, 'a.id', 'va.asset_id')
            .select(
              'va.variant_id',
              'a.id',
              'a.created_at',
              'a.updated_at',
              'a.filename',
              'a.ext',
              'a.source',
              'a.provider_id',
              'a.mime_type',
              'a.size'
            )
            .whereIn('va.variant_id', variantIds)
            .orderBy('va.order', 'asc')
        : [],
      productIds.length > 0
        ? this.trx
            .from({ pa: Tables.ProductAsset })
            .innerJoin({ a: Tables.Asset }, 'a.id', 'pa.asset_id')
            .select(
              'pa.product_id',
              'a.id',
              'a.created_at',
              'a.updated_at',
              'a.filename',
              'a.ext',
              'a.source',
              'a.provider_id',
              'a.mime_type',
              'a.size'
            )
            .whereIn('pa.product_id', productIds)
            .orderBy('pa.order', 'asc')
        : []
    ]);

    // ============ QUERY 4: OptionValues + Presets ============
    const optionValueRows =
      variantIds.length > 0
        ? await this.trx
            .from({ vov: Tables.VariantOptionValue })
            .innerJoin({ ov: Tables.OptionValue }, 'ov.id', 'vov.option_value_id')
            .leftJoin({ ovp: Tables.OptionValuePreset }, 'ovp.id', 'ov.option_value_preset_id')
            .select(
              'vov.variant_id',
              // OptionValue
              'ov.id as ov_id',
              'ov.created_at as ov_created_at',
              'ov.updated_at as ov_updated_at',
              'ov.deleted_at as ov_deleted_at',
              'ov.name as ov_name',
              'ov.order as ov_order',
              'ov.option_id as ov_option_id',
              'ov.option_value_preset_id as ov_preset_id',
              // Preset
              'ovp.id as ovp_id',
              'ovp.created_at as ovp_created_at',
              'ovp.updated_at as ovp_updated_at',
              'ovp.name as ovp_name',
              'ovp.metadata as ovp_metadata',
              'ovp.option_preset_id as ovp_option_preset_id'
            )
            .whereIn('vov.variant_id', variantIds)
        : [];

    // ============ DESERIALIZE ============

    // Order
    const order = orderSerializer.deserialize({
      id: orderRow.o_id,
      created_at: orderRow.o_created_at,
      updated_at: orderRow.o_updated_at,
      code: orderRow.o_code,
      state: orderRow.o_state,
      total: orderRow.o_total,
      subtotal: orderRow.o_subtotal,
      total_quantity: orderRow.o_total_quantity,
      applied_discounts: orderRow.o_applied_discounts,
      placed_at: orderRow.o_placed_at,
      completed_at: orderRow.o_completed_at,
      shipping_address: orderRow.o_shipping_address,
      customer_id: orderRow.o_customer_id
    }) as Order;

    // Customer
    const customer = orderRow.c_id
      ? (customerSerializer.deserialize({
          id: orderRow.c_id,
          created_at: orderRow.c_created_at,
          updated_at: orderRow.c_updated_at,
          email: orderRow.c_email,
          first_name: orderRow.c_first_name,
          last_name: orderRow.c_last_name,
          phone_number: orderRow.c_phone_number,
          enabled: orderRow.c_enabled
        }) as Customer)
      : null;

    // Fulfillment
    const fulfillment = orderRow.f_id
      ? (fulfillmentSerializer.deserialize({
          id: orderRow.f_id,
          created_at: orderRow.f_created_at,
          updated_at: orderRow.f_updated_at,
          type: orderRow.f_type,
          amount: orderRow.f_amount,
          total: orderRow.f_total,
          order_id: orderRow.f_order_id
        }) as DeliveryMethod)
      : null;

    const shippingFulfillment = orderRow.sf_id
      ? (shippingFulfillmentSerializer.deserialize({
          id: orderRow.sf_id,
          created_at: orderRow.sf_created_at,
          updated_at: orderRow.sf_updated_at,
          method: orderRow.sf_method,
          delivery_method_id: orderRow.sf_fulfillment_id,
          shipping_method_id: orderRow.sf_shipping_method_id
        }) as DeliveryMethodShipping)
      : null;

    const inStorePickupFulfillment = orderRow.pf_id
      ? (inStorePickupFulfillmentSerializer.deserialize({
          id: orderRow.pf_id,
          created_at: orderRow.pf_created_at,
          updated_at: orderRow.pf_updated_at,
          address: orderRow.pf_address,
          delivery_method_id: orderRow.pf_fulfillment_id,
          location_id: orderRow.pf_location_id
        }) as DeliveryMethodPickup)
      : null;

    // Lines with variants, products, assets, optionValues
    const lines = lineRows.map(row => {
      const line = orderLineSerializer.deserialize({
        id: row.ol_id,
        created_at: row.ol_created_at,
        updated_at: row.ol_updated_at,
        unit_price: row.ol_unit_price,
        line_subtotal: row.ol_line_subtotal,
        line_total: row.ol_line_total,
        quantity: row.ol_quantity,
        applied_discounts: row.ol_applied_discounts,
        variant_id: row.ol_variant_id,
        order_id: row.ol_order_id
      }) as OrderLine;

      const variant = variantSerializer.deserialize({
        id: row.v_id,
        created_at: row.v_created_at,
        updated_at: row.v_updated_at,
        deleted_at: row.v_deleted_at,
        sale_price: row.v_sale_price,
        comparison_price: row.v_comparison_price,
        cost_per_unit: row.v_cost_per_unit,
        stock: row.v_stock,
        sku: row.v_sku,
        requires_shipping: row.v_requires_shipping,
        weight: row.v_weight,
        dimensions: row.v_dimensions,
        product_id: row.v_product_id
      }) as Variant;

      const product = productSerializer.deserialize({
        id: row.p_id,
        created_at: row.p_created_at,
        updated_at: row.p_updated_at,
        deleted_at: row.p_deleted_at,
        name: row.p_name,
        slug: row.p_slug,
        description: row.p_description,
        enabled: row.p_enabled,
        archived: row.p_archived,
        min_sale_price: row.p_min_sale_price,
        max_sale_price: row.p_max_sale_price
      }) as Product;

      // Assets
      const vAssets = variantAssetRows
        .filter(a => a.variant_id === row.v_id)
        .map(a => assetSerializer.deserialize(a) as Asset);
      const pAssets = productAssetRows
        .filter(a => a.product_id === row.p_id)
        .map(a => assetSerializer.deserialize(a) as Asset);

      // OptionValues with presets
      const optionValues = optionValueRows
        .filter(ov => ov.variant_id === row.v_id)
        .map(ov => {
          const optionValue = optionValueSerializer.deserialize({
            id: ov.ov_id,
            created_at: ov.ov_created_at,
            updated_at: ov.ov_updated_at,
            deleted_at: ov.ov_deleted_at,
            name: ov.ov_name,
            order: ov.ov_order,
            option_id: ov.ov_option_id,
            option_value_preset_id: ov.ov_preset_id
          }) as OptionValue;

          const preset = ov.ovp_id
            ? (optionValuePresetSerializer.deserialize({
                id: ov.ovp_id,
                created_at: ov.ovp_created_at,
                updated_at: ov.ovp_updated_at,
                name: ov.ovp_name,
                metadata: ov.ovp_metadata,
                option_preset_id: ov.ovp_option_preset_id
              }) as OptionValuePreset)
            : null;

          return {
            ...optionValue,
            preset
          };
        });

      return {
        ...line,
        variant: {
          ...variant,
          product: {
            ...product,
            assets: pAssets
          },
          assets: vAssets,
          optionValues
        }
      };
    });

    return {
      ...order,
      customer: customer as Customer,
      fulfillment: fulfillment as DeliveryMethod,
      fulfillmentDetails:
        (fulfillment?.type as DeliveryMethodType) === 'SHIPPING'
          ? (shippingFulfillment as DeliveryMethodShipping)
          : (inStorePickupFulfillment as DeliveryMethodPickup),
      lines
    };
  }
}

type OrderWithDetails = Order & {
  customer: Customer;
  fulfillment: DeliveryMethod;
  fulfillmentDetails: DeliveryMethodShipping | DeliveryMethodPickup;
  lines: (OrderLine & {
    variant: Variant & {
      assets: Asset[];
      product: Product & {
        assets: Asset[];
      };
      optionValues: (OptionValue & { preset: OptionValuePreset | null })[];
    };
  })[];
};
