import { LuneLogger, LunePrice } from '@lune/common';
import type {
  Database,
  Fulfillment,
  ID,
  InStorePickupFulfillment,
  LuneEvent,
  OrderDeliveredEvent,
  OrderPlacedEvent,
  OrderReadyForPickupEvent,
  OrderShippedEvent,
  ShippingFulfillment
} from '@lune/core';
import {
  AssetSerializer,
  CustomerSerializer,
  enableRLS,
  eventBus,
  FulfillmentSerializer,
  InStorePickupFulfillmentSerializer,
  OrderEvent,
  OrderLineSerializer,
  OrderSerializer,
  ProductSerializer,
  ShippingFulfillmentSerializer,
  Tables,
  VariantSerializer
} from '@lune/core';

import type { EmailPluginConfig } from '../email-plugin.types';

export class OrderListener {
  private database: Database | undefined;

  constructor(private readonly pluginConfig: EmailPluginConfig) {}

  init(database: Database) {
    this.database = database;

    return this;
  }

  registerOnOrderPlacedListener() {
    eventBus.on(OrderEvent.Placed, async (event: OrderPlacedEvent) => {
      if (this.pluginConfig.devMode) {
        LuneLogger.info(`email sent for order ${event.orderId} (order placed)`);

        return;
      }

      // const order = await this.getOrderForEmail(event.orderId, event);

      // this.sender.send({
      //   from: { email: '', name: '' },
      //   html: await EmailTemplates.orderPlaced({
      //     ...this.transformOrderToEmailProps(order),
      //     shop: '' as unknown as Shop,
      //   }),
      //   subject: '',
      //   to: '',
      // });
    });

    return this;
  }

  registerOnOrderShippedListener() {
    eventBus.on(OrderEvent.Shipped, async (event: OrderShippedEvent) => {
      if (this.pluginConfig.devMode) {
        LuneLogger.info(`email sent for order ${event.orderId} (order shipped)`);

        return;
      }
    });

    return this;
  }

  registerOnOrderReadyForPickupListener() {
    eventBus.on(OrderEvent.ReadyForPickup, async (event: OrderReadyForPickupEvent) => {
      if (this.pluginConfig.devMode) {
        LuneLogger.info(`email sent for order ${event.orderId} (order delivered)`);

        return;
      }
    });

    return this;
  }

  registerOnOrderDeliveredListener() {
    eventBus.on(OrderEvent.Delivered, async (event: OrderDeliveredEvent) => {
      if (this.pluginConfig.devMode) {
        LuneLogger.info(`email sent for order ${event.orderId} (order delivered)`);

        return;
      }
    });

    return this;
  }

  private async getOrderForEmail(orderId: ID, event: LuneEvent) {
    if (!this.database) throw new Error('Database is not present');

    const trx = await this.database.transaction();

    await enableRLS({
      trx,
      shopId: event.ctx.shopId,
      ownerId: event.ctx.userId
    });

    try {
      // Serializers
      const orderSerializer = new OrderSerializer();
      const customerSerializer = new CustomerSerializer();
      const fulfillmentSerializer = new FulfillmentSerializer();
      const shippingFulfillmentSerializer = new ShippingFulfillmentSerializer();
      const inStorePickupFulfillmentSerializer = new InStorePickupFulfillmentSerializer();
      const orderLineSerializer = new OrderLineSerializer();
      const variantSerializer = new VariantSerializer();
      const productSerializer = new ProductSerializer();
      const assetSerializer = new AssetSerializer();

      // ============ QUERY 1: Order + Customer + Fulfillment + Details ============
      const orderRow = await trx
        .from({ o: Tables.Order })
        .leftJoin({ c: Tables.Customer }, 'c.id', 'o.customer_id')
        .leftJoin({ f: Tables.Fulfillment }, 'f.order_id', 'o.id')
        .leftJoin({ sf: Tables.ShippingFulfillment }, 'sf.fulfillment_id', 'f.id')
        .leftJoin({ pf: Tables.InStorePickupFulfillment }, 'pf.fulfillment_id', 'f.id')
        .select(
          // Order
          'o.id as o_id',
          'o.code as o_code',
          'o.state as o_state',
          'o.total as o_total',
          'o.subtotal as o_subtotal',
          'o.total_quantity as o_total_quantity',
          'o.applied_discounts as o_applied_discounts',
          'o.placed_at as o_placed_at',
          'o.shipping_address as o_shipping_address',
          'o.customer_id as o_customer_id',
          'o.created_at as o_created_at',
          'o.updated_at as o_updated_at',
          // Customer
          'c.id as c_id',
          'c.email as c_email',
          'c.first_name as c_first_name',
          'c.last_name as c_last_name',
          'c.phone_number as c_phone_number',
          'c.enabled as c_enabled',
          'c.created_at as c_created_at',
          'c.updated_at as c_updated_at',
          // Fulfillment
          'f.id as f_id',
          'f.type as f_type',
          'f.amount as f_amount',
          'f.total as f_total',
          'f.order_id as f_order_id',
          'f.created_at as f_created_at',
          'f.updated_at as f_updated_at',
          // ShippingFulfillment
          'sf.id as sf_id',
          'sf.method as sf_method',
          'sf.tracking_code as sf_tracking_code',
          'sf.carrier as sf_carrier',
          'sf.shipped_at as sf_shipped_at',
          'sf.delivered_at as sf_delivered_at',
          'sf.fulfillment_id as sf_fulfillment_id',
          'sf.shipping_method_id as sf_shipping_method_id',
          // InStorePickupFulfillment
          'pf.id as pf_id',
          'pf.address as pf_address',
          'pf.ready_at as pf_ready_at',
          'pf.picked_up_at as pf_picked_up_at',
          'pf.fulfillment_id as pf_fulfillment_id',
          'pf.location_id as pf_location_id'
        )
        .where('o.id', orderId)
        .first();

      if (!orderRow) throw new Error('Order not found');

      // ============ QUERY 2: Lines + Variant + Product ============
      const lineRows = await trx
        .from({ ol: Tables.OrderLine })
        .innerJoin({ v: Tables.Variant }, 'v.id', 'ol.variant_id')
        .innerJoin({ p: Tables.Product }, 'p.id', 'v.product_id')
        .select(
          // OrderLine
          'ol.id as ol_id',
          'ol.unit_price as ol_unit_price',
          'ol.line_subtotal as ol_line_subtotal',
          'ol.line_total as ol_line_total',
          'ol.quantity as ol_quantity',
          'ol.applied_discounts as ol_applied_discounts',
          'ol.variant_id as ol_variant_id',
          'ol.order_id as ol_order_id',
          'ol.created_at as ol_created_at',
          'ol.updated_at as ol_updated_at',
          // Variant
          'v.id as v_id',
          'v.sale_price as v_sale_price',
          'v.comparison_price as v_comparison_price',
          'v.stock as v_stock',
          'v.sku as v_sku',
          'v.product_id as v_product_id',
          'v.created_at as v_created_at',
          'v.updated_at as v_updated_at',
          // Product
          'p.id as p_id',
          'p.name as p_name',
          'p.slug as p_slug',
          'p.description as p_description',
          'p.created_at as p_created_at',
          'p.updated_at as p_updated_at'
        )
        .where('ol.order_id', orderId);

      const variantIds = lineRows.map(r => r.v_id);
      const productIds = [...new Set(lineRows.map(r => r.p_id))];

      // ============ QUERY 3: Assets (variant + product) ============
      const [variantAssetRows, productAssetRows] = await Promise.all([
        trx
          .from({ va: Tables.VariantAsset })
          .innerJoin({ a: Tables.Asset }, 'a.id', 'va.asset_id')
          .select('va.variant_id', 'a.*')
          .whereIn('va.variant_id', variantIds)
          .orderBy('va.order', 'asc'),
        trx
          .from({ pa: Tables.ProductAsset })
          .innerJoin({ a: Tables.Asset }, 'a.id', 'pa.asset_id')
          .select('pa.product_id', 'a.*')
          .whereIn('pa.product_id', productIds)
          .orderBy('pa.order', 'asc')
      ]);

      // ============ QUERY 4: OptionValues + Options + Presets ============
      const optionValueRows = await trx
        .from({ vov: Tables.VariantOptionValue })
        .innerJoin({ ov: Tables.OptionValue }, 'ov.id', 'vov.option_value_id')
        .innerJoin({ o: Tables.Option }, 'o.id', 'ov.option_id')
        .leftJoin({ ovp: Tables.OptionValuePreset }, 'ovp.id', 'ov.option_value_preset_id')
        .select(
          'vov.variant_id',
          // OptionValue
          'ov.id as ov_id',
          'ov.name as ov_name',
          'ov.order as ov_order',
          'ov.option_id as ov_option_id',
          'ov.option_value_preset_id as ov_preset_id',
          'ov.created_at as ov_created_at',
          'ov.updated_at as ov_updated_at',
          // Option
          'o.id as o_id',
          'o.name as o_name',
          'o.created_at as o_created_at',
          'o.updated_at as o_updated_at',
          // Preset
          'ovp.id as ovp_id',
          'ovp.name as ovp_name',
          'ovp.metadata as ovp_metadata'
        )
        .whereIn('vov.variant_id', variantIds);

      // ============ DESERIALIZE ============

      // Order
      const order = orderSerializer.deserialize({
        id: orderRow.o_id,
        code: orderRow.o_code,
        state: orderRow.o_state,
        total: orderRow.o_total,
        subtotal: orderRow.o_subtotal,
        total_quantity: orderRow.o_total_quantity,
        applied_discounts: orderRow.o_applied_discounts,
        placed_at: orderRow.o_placed_at,
        shipping_address: orderRow.o_shipping_address,
        customer_id: orderRow.o_customer_id,
        created_at: orderRow.o_created_at,
        updated_at: orderRow.o_updated_at
      });

      // Customer
      const customer = orderRow.c_id
        ? customerSerializer.deserialize({
            id: orderRow.c_id,
            email: orderRow.c_email,
            first_name: orderRow.c_first_name,
            last_name: orderRow.c_last_name,
            phone_number: orderRow.c_phone_number,
            enabled: orderRow.c_enabled,
            created_at: orderRow.c_created_at,
            updated_at: orderRow.c_updated_at
          })
        : null;

      // Fulfillment
      let fulfillment:
        | (Fulfillment & {
            shipping: ShippingFulfillment | null;
            pickup: InStorePickupFulfillment | null;
          })
        | null = null;
      if (orderRow.f_id) {
        const baseFulfillment = fulfillmentSerializer.deserialize({
          id: orderRow.f_id,
          type: orderRow.f_type,
          amount: orderRow.f_amount,
          total: orderRow.f_total,
          order_id: orderRow.f_order_id,
          created_at: orderRow.f_created_at,
          updated_at: orderRow.f_updated_at
        }) as Fulfillment;

        const shipping = orderRow.sf_id
          ? (shippingFulfillmentSerializer.deserialize({
              id: orderRow.sf_id,
              method: orderRow.sf_method,
              tracking_code: orderRow.sf_tracking_code,
              carrier: orderRow.sf_carrier,
              shipped_at: orderRow.sf_shipped_at,
              delivered_at: orderRow.sf_delivered_at,
              fulfillment_id: orderRow.sf_fulfillment_id,
              shipping_method_id: orderRow.sf_shipping_method_id
            }) as ShippingFulfillment)
          : null;

        const pickup = orderRow.pf_id
          ? (inStorePickupFulfillmentSerializer.deserialize({
              id: orderRow.pf_id,
              address: orderRow.pf_address,
              ready_at: orderRow.pf_ready_at,
              picked_up_at: orderRow.pf_picked_up_at,
              fulfillment_id: orderRow.pf_fulfillment_id,
              location_id: orderRow.pf_location_id
            }) as InStorePickupFulfillment)
          : null;

        fulfillment = { ...baseFulfillment, shipping, pickup };
      }

      // Lines con variants, products, assets, optionValues
      const lines = lineRows.map(row => {
        const line = orderLineSerializer.deserialize({
          id: row.ol_id,
          unit_price: row.ol_unit_price,
          line_subtotal: row.ol_line_subtotal,
          line_total: row.ol_line_total,
          quantity: row.ol_quantity,
          applied_discounts: row.ol_applied_discounts,
          variant_id: row.ol_variant_id,
          order_id: row.ol_order_id,
          created_at: row.ol_created_at,
          updated_at: row.ol_updated_at
        });

        const variant = variantSerializer.deserialize({
          id: row.v_id,
          sale_price: row.v_sale_price,
          comparison_price: row.v_comparison_price,
          stock: row.v_stock,
          sku: row.v_sku,
          product_id: row.v_product_id,
          created_at: row.v_created_at,
          updated_at: row.v_updated_at
        });

        const product = productSerializer.deserialize({
          id: row.p_id,
          name: row.p_name,
          slug: row.p_slug,
          description: row.p_description,
          created_at: row.p_created_at,
          updated_at: row.p_updated_at
        });

        // Assets: variant first, fallback to product
        const vAssets = variantAssetRows
          .filter(a => a.variant_id === row.v_id)
          .map(a => assetSerializer.deserialize(a));
        const pAssets = productAssetRows
          .filter(a => a.product_id === row.p_id)
          .map(a => assetSerializer.deserialize(a));
        const assets = vAssets.length > 0 ? vAssets : pAssets;

        // OptionValues
        const optionValues = optionValueRows
          .filter(ov => ov.variant_id === row.v_id)
          .map(ov => ({
            id: ov.ov_id,
            name: ov.ovp_name ?? ov.ov_name,
            order: ov.ov_order,
            optionId: ov.ov_option_id,
            presetId: ov.ov_preset_id,
            option: { id: ov.o_id, name: ov.o_name },
            metadata: ov.ovp_metadata ?? null
          }));

        return {
          ...line,
          variant: {
            ...variant,
            product,
            assets,
            optionValues
          }
        };
      });

      await trx.commit();

      return { ...order, customer, fulfillment, lines };
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }

  private transformOrderToEmailProps(order: Awaited<ReturnType<typeof this.getOrderForEmail>>) {
    const { customer, fulfillment, lines } = order;

    const location = fulfillment?.pickup
      ? {
          name: fulfillment.pickup.address?.name,
          address: fulfillment.pickup.address
        }
      : undefined;

    const orderLines = lines.map(line => {
      const { variant } = line;
      const hasDiscount =
        variant.comparisonPrice && variant.comparisonPrice > (variant.salePrice as number);
      const firstAsset = variant.assets[0];

      return {
        name: variant.product.name,
        image: firstAsset?.source ?? '',
        salePrice: LunePrice.format(line.unitPrice as number),
        priceBeforeDiscount: hasDiscount
          ? LunePrice.format(variant.comparisonPrice ?? 0) // TODO: make this ok
          : undefined,
        optionValues: variant.optionValues.map(ov => ({
          id: ov.id,
          name: ov.name ?? '',
          optionName: ov.option?.name ?? '',
          metadata: ov.metadata ?? {}
        }))
      };
    });

    return {
      customer,
      order,
      fulfillment,
      location,
      orderLines
    };
  }
}

// add eslint (lune config) and prettier
// type safe getOrderForEmail method
// provide more options (replace templates?, use shared components for creating my own templates?)
// start using them
// create a dev mailbox? like vendure
