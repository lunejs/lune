import type { OrderListInput } from '@/api/shared/types/graphql';
import type { Transaction } from '@/persistence/connection/connection';
import type { Asset } from '@/persistence/entities/asset';
import type { CustomFieldDefinition } from '@/persistence/entities/custom-field-definition';
import type { CustomObjectDefinition } from '@/persistence/entities/custom-object-definition';
import type { CustomObjectEntry } from '@/persistence/entities/custom-object-entry';
import type { CustomObjectEntryValue } from '@/persistence/entities/custom-object-entry-value';
import type { Customer } from '@/persistence/entities/customer';
import type { DeliveryMethod, DeliveryMethodType } from '@/persistence/entities/delivery-method';
import type { DeliveryMethodPickup } from '@/persistence/entities/delivery-method-pickup';
import type { DeliveryMethodShipping } from '@/persistence/entities/delivery-method-shipping';
import type { ID } from '@/persistence/entities/entity';
import { type Fulfillment } from '@/persistence/entities/fulfillment';
import { type FulfillmentLine } from '@/persistence/entities/fulfillment-line';
import type { OptionValue } from '@/persistence/entities/option_value';
import { type Order, OrderState, type OrderTable } from '@/persistence/entities/order';
import type { OrderLine } from '@/persistence/entities/order-line';
import type { Product } from '@/persistence/entities/product';
import type { Variant } from '@/persistence/entities/variant';
import { OrderFilter } from '@/persistence/filters/order.filter';
import { AssetSerializer } from '@/persistence/serializers/asset.serializer';
import { CustomFieldDefinitionSerializer } from '@/persistence/serializers/custom-field-definition.serializer';
import { CustomObjectDefinitionSerializer } from '@/persistence/serializers/custom-object-definition.serializer';
import { CustomObjectEntrySerializer } from '@/persistence/serializers/custom-object-entry.serializer';
import { CustomObjectEntryValueSerializer } from '@/persistence/serializers/custom-object-entry-value.serializer';
import { CustomerSerializer } from '@/persistence/serializers/customer.serializer';
import { DeliveryMethodSerializer } from '@/persistence/serializers/delivery-method.serializer';
import { DeliveryMethodPickupSerializer } from '@/persistence/serializers/delivery-method-pickup.serializer';
import { DeliveryMethodShippingSerializer } from '@/persistence/serializers/delivery-method-shipping.serializer';
import { FulfillmentSerializer } from '@/persistence/serializers/fulfillment.serializer';
import { FulfillmentLineSerializer } from '@/persistence/serializers/fulfillment-line.serializer';
import { OptionValueSerializer } from '@/persistence/serializers/option-value.serializer';
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

  async findOneWithDetails(orderId: ID): Promise<OrderWithDetails | null> {
    // Serializers
    const orderSerializer = new OrderSerializer();
    const customerSerializer = new CustomerSerializer();
    const deliveryMethodSerializer = new DeliveryMethodSerializer();
    const shippingFulfillmentSerializer = new DeliveryMethodShippingSerializer();
    const inStorePickupFulfillmentSerializer = new DeliveryMethodPickupSerializer();
    const orderLineSerializer = new OrderLineSerializer();
    const variantSerializer = new VariantSerializer();
    const productSerializer = new ProductSerializer();
    const assetSerializer = new AssetSerializer();
    const optionValueSerializer = new OptionValueSerializer();
    const fulfillmentSerializer = new FulfillmentSerializer();
    const fulfillmentLineSerializer = new FulfillmentLineSerializer();
    const customObjectEntrySerializer = new CustomObjectEntrySerializer();
    const customObjectDefinitionSerializer = new CustomObjectDefinitionSerializer();
    const customObjectEntryValueSerializer = new CustomObjectEntryValueSerializer();
    const customFieldDefinitionSerializer = new CustomFieldDefinitionSerializer();

    // ============ QUERY 1: Order + Customer + DeliveryMethod + Details ============
    const orderRow = await this.trx
      .from({ o: Tables.Order })
      .leftJoin({ c: Tables.Customer }, 'c.id', 'o.customer_id')
      .leftJoin({ f: Tables.DeliveryMethod }, 'f.order_id', 'o.id')
      .leftJoin({ sf: Tables.DeliveryMethodShipping }, 'sf.delivery_method_id', 'f.id')
      .leftJoin({ pf: Tables.DeliveryMethodPickup }, 'pf.delivery_method_id', 'f.id')
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
        // DeliveryMethod
        'f.id as f_id',
        'f.created_at as f_created_at',
        'f.updated_at as f_updated_at',
        'f.type as f_type',
        'f.amount as f_amount',
        'f.total as f_total',
        'f.order_id as f_order_id',
        // DeliveryMethodShipping
        'sf.id as sf_id',
        'sf.created_at as sf_created_at',
        'sf.updated_at as sf_updated_at',
        'sf.method as sf_method',
        'sf.delivery_method_id as sf_delivery_method_id',
        'sf.shipping_method_id as sf_shipping_method_id',
        // DeliveryMethodPickup
        'pf.id as pf_id',
        'pf.created_at as pf_created_at',
        'pf.updated_at as pf_updated_at',
        'pf.address as pf_address',
        'pf.delivery_method_id as pf_delivery_method_id',
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

    // ============ QUERY 4: OptionValues ============
    const optionValueRows =
      variantIds.length > 0
        ? await this.trx
            .from({ vov: Tables.VariantOptionValue })
            .innerJoin({ ov: Tables.OptionValue }, 'ov.id', 'vov.option_value_id')
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
              'ov.custom_object_entry_id as ov_custom_object_entry_id'
            )
            .whereIn('vov.variant_id', variantIds)
        : [];

    // ============ QUERY 4.1: CustomObjectEntries for OptionValues ============
    const customObjectEntryIds = [
      ...new Set(
        optionValueRows
          .map(ov => ov.ov_custom_object_entry_id)
          .filter((id): id is string => id !== null)
      )
    ];

    const customObjectEntryRows =
      customObjectEntryIds.length > 0
        ? await this.trx
            .from({ coe: Tables.CustomObjectEntry })
            .select(
              'coe.id as coe_id',
              'coe.created_at as coe_created_at',
              'coe.updated_at as coe_updated_at',
              'coe.slug as coe_slug',
              'coe.definition_id as coe_definition_id'
            )
            .whereIn('coe.id', customObjectEntryIds)
        : [];

    // ============ QUERY 4.2: CustomObjectDefinitions ============
    const definitionIds = [...new Set(customObjectEntryRows.map(row => row.coe_definition_id))];

    const customObjectDefinitionRows =
      definitionIds.length > 0
        ? await this.trx
            .from({ cod: Tables.CustomObjectDefinition })
            .select(
              'cod.id as cod_id',
              'cod.created_at as cod_created_at',
              'cod.updated_at as cod_updated_at',
              'cod.name as cod_name',
              'cod.key as cod_key',
              'cod.display_field_id as cod_display_field_id'
            )
            .whereIn('cod.id', definitionIds)
        : [];

    // ============ QUERY 4.3: CustomObjectEntryValues ============
    const customObjectEntryValueRows =
      customObjectEntryIds.length > 0
        ? await this.trx
            .from({ coev: Tables.CustomObjectEntryValue })
            .select(
              'coev.id as coev_id',
              'coev.created_at as coev_created_at',
              'coev.updated_at as coev_updated_at',
              'coev.value as coev_value',
              'coev.entry_id as coev_entry_id',
              'coev.field_id as coev_field_id'
            )
            .whereIn('coev.entry_id', customObjectEntryIds)
        : [];

    // ============ QUERY 4.4: CustomFieldDefinitions (for field keys) ============
    const fieldIds = [...new Set(customObjectEntryValueRows.map(row => row.coev_field_id))];

    const customFieldDefinitionRows =
      fieldIds.length > 0
        ? await this.trx
            .from({ cfd: Tables.CustomFieldDefinition })
            .select(
              'cfd.id as cfd_id',
              'cfd.created_at as cfd_created_at',
              'cfd.updated_at as cfd_updated_at',
              'cfd.name as cfd_name',
              'cfd.key as cfd_key',
              'cfd.type as cfd_type'
            )
            .whereIn('cfd.id', fieldIds)
        : [];

    // Build maps for quick lookup
    const entriesMap = new Map<string, CustomObjectEntry>();
    for (const row of customObjectEntryRows) {
      entriesMap.set(
        row.coe_id,
        customObjectEntrySerializer.deserialize({
          id: row.coe_id,
          created_at: row.coe_created_at,
          updated_at: row.coe_updated_at,
          slug: row.coe_slug,
          definition_id: row.coe_definition_id
        }) as CustomObjectEntry
      );
    }

    const definitionsMap = new Map<string, CustomObjectDefinition>();
    for (const row of customObjectDefinitionRows) {
      definitionsMap.set(
        row.cod_id,
        customObjectDefinitionSerializer.deserialize({
          id: row.cod_id,
          created_at: row.cod_created_at,
          updated_at: row.cod_updated_at,
          name: row.cod_name,
          key: row.cod_key,
          display_field_id: row.cod_display_field_id
        }) as CustomObjectDefinition
      );
    }

    const entryValuesMap = new Map<string, CustomObjectEntryValue[]>();
    for (const row of customObjectEntryValueRows) {
      const entryId = row.coev_entry_id;
      if (!entryValuesMap.has(entryId)) {
        entryValuesMap.set(entryId, []);
      }
      entryValuesMap.get(entryId)?.push(
        customObjectEntryValueSerializer.deserialize({
          id: row.coev_id,
          created_at: row.coev_created_at,
          updated_at: row.coev_updated_at,
          value: row.coev_value,
          entry_id: row.coev_entry_id,
          field_id: row.coev_field_id
        }) as CustomObjectEntryValue
      );
    }

    const fieldsMap = new Map<string, CustomFieldDefinition>();
    for (const row of customFieldDefinitionRows) {
      fieldsMap.set(
        row.cfd_id,
        customFieldDefinitionSerializer.deserialize({
          id: row.cfd_id,
          created_at: row.cfd_created_at,
          updated_at: row.cfd_updated_at,
          name: row.cfd_name,
          key: row.cfd_key,
          type: row.cfd_type
        }) as CustomFieldDefinition
      );
    }

    // ============ QUERY 5: Fulfillments + FulfillmentLines ============
    const fulfillmentRows = await this.trx
      .from({ ff: Tables.Fulfillment })
      .select(
        'ff.id as ff_id',
        'ff.created_at as ff_created_at',
        'ff.updated_at as ff_updated_at',
        'ff.code as ff_code',
        'ff.total_quantity as ff_total_quantity',
        'ff.state as ff_state',
        'ff.type as ff_type',
        'ff.metadata as ff_metadata',
        'ff.order_id as ff_order_id'
      )
      .where('ff.order_id', orderId);

    const fulfillmentIds = fulfillmentRows.map(r => r.ff_id);

    const fulfillmentLineRows =
      fulfillmentIds.length > 0
        ? await this.trx
            .from({ fl: Tables.FulfillmentLine })
            .select(
              'fl.id as fl_id',
              'fl.created_at as fl_created_at',
              'fl.updated_at as fl_updated_at',
              'fl.quantity as fl_quantity',
              'fl.fulfillment_id as fl_fulfillment_id',
              'fl.order_line_id as fl_order_line_id'
            )
            .whereIn('fl.fulfillment_id', fulfillmentIds)
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

    // DeliveryMethod
    const deliveryMethod = orderRow.f_id
      ? (deliveryMethodSerializer.deserialize({
          id: orderRow.f_id,
          created_at: orderRow.f_created_at,
          updated_at: orderRow.f_updated_at,
          type: orderRow.f_type,
          amount: orderRow.f_amount,
          total: orderRow.f_total,
          order_id: orderRow.f_order_id
        }) as DeliveryMethod)
      : null;

    const deliveryMethodShipping = orderRow.sf_id
      ? (shippingFulfillmentSerializer.deserialize({
          id: orderRow.sf_id,
          created_at: orderRow.sf_created_at,
          updated_at: orderRow.sf_updated_at,
          method: orderRow.sf_method,
          delivery_method_id: orderRow.sf_delivery_method_id,
          shipping_method_id: orderRow.sf_shipping_method_id
        }) as DeliveryMethodShipping)
      : null;

    const deliveryMethodPickup = orderRow.pf_id
      ? (inStorePickupFulfillmentSerializer.deserialize({
          id: orderRow.pf_id,
          created_at: orderRow.pf_created_at,
          updated_at: orderRow.pf_updated_at,
          address: orderRow.pf_address,
          delivery_method_id: orderRow.pf_delivery_method_id,
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

      // OptionValues with custom object entry data
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
            custom_object_entry_id: ov.ov_custom_object_entry_id
          }) as OptionValue;

          // If has custom object entry, get name from display field and build metadata
          if (ov.ov_custom_object_entry_id) {
            const entry = entriesMap.get(ov.ov_custom_object_entry_id);
            if (entry) {
              const definition = definitionsMap.get(entry.definitionId);
              const entryValues = entryValuesMap.get(entry.id) ?? [];

              let displayName = optionValue.name;
              const metadata: Record<string, unknown> = {};

              for (const val of entryValues) {
                const field = fieldsMap.get(val.fieldId);
                if (!field) continue;

                if (definition?.displayFieldId === val.fieldId) {
                  // This is the display field - use as name
                  displayName = val.value as string;
                } else {
                  // Other fields go to metadata
                  metadata[field.key] = val.value;
                }
              }

              return {
                ...optionValue,
                name: displayName,
                metadata: Object.keys(metadata).length > 0 ? metadata : undefined
              };
            }
          }

          return {
            ...optionValue
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

    // Fulfillments with lines
    const fulfillments = fulfillmentRows.map(row => {
      const fulfillment = fulfillmentSerializer.deserialize({
        id: row.ff_id,
        created_at: row.ff_created_at,
        updated_at: row.ff_updated_at,
        code: row.ff_code,
        total_quantity: row.ff_total_quantity,
        state: row.ff_state,
        type: row.ff_type,
        metadata: row.ff_metadata,
        order_id: row.ff_order_id
      }) as Fulfillment;

      const fulfillmentLines = fulfillmentLineRows
        .filter(fl => fl.fl_fulfillment_id === row.ff_id)
        .map(
          fl =>
            fulfillmentLineSerializer.deserialize({
              id: fl.fl_id,
              created_at: fl.fl_created_at,
              updated_at: fl.fl_updated_at,
              quantity: fl.fl_quantity,
              fulfillment_id: fl.fl_fulfillment_id,
              order_line_id: fl.fl_order_line_id
            }) as FulfillmentLine
        );

      return {
        ...fulfillment,
        lines: fulfillmentLines
      };
    });

    return {
      ...order,
      fulfillments,
      customer: customer as Customer,
      deliveryMethod: deliveryMethod as DeliveryMethod,
      deliveryMethodDetails:
        (deliveryMethod?.type as DeliveryMethodType) === 'SHIPPING'
          ? (deliveryMethodShipping as DeliveryMethodShipping)
          : (deliveryMethodPickup as DeliveryMethodPickup),
      lines
    };
  }
}

type OrderWithDetails = Order & {
  customer: Customer;
  deliveryMethod: DeliveryMethod;
  deliveryMethodDetails: DeliveryMethodShipping | DeliveryMethodPickup;
  fulfillments: (Fulfillment & {
    lines: FulfillmentLine[];
  })[];
  lines: (OrderLine & {
    variant: Variant & {
      assets: Asset[];
      product: Product & {
        assets: Asset[];
      };
      optionValues: (OptionValue & { metadata?: any })[];
    };
  })[];
};
