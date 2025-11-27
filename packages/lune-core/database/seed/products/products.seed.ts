import type { Knex } from 'knex';

import { LuneLogger } from '@/logger/lune.logger';
import { LunePrice } from '@lune/common';
import { Tables } from '@/persistence/tables';
import type { ProductTable } from '@/persistence/entities/product';
import type { VariantTable } from '@/persistence/entities/variant';
import type { OptionTable } from '@/persistence/entities/option';
import type { OptionValueTable } from '@/persistence/entities/option_value';
import type { VariantOptionValueTable } from '@/persistence/entities/variant-option-value';
import type { AssetTable } from '@/persistence/entities/asset';
import type { ProductAssetTable } from '@/persistence/entities/product-asset';
import type { OptionPresetTable } from '@/persistence/entities/option-preset';
import type { OptionValuePresetTable } from '@/persistence/entities/option-value-preset';
import type { SeedContext } from '../seed.types';

import Products from './products.json';
import ElectronicProducts from './electronics.json';

const TIMESTAMP_OFFSET_SECONDS = 30;

const ALL_PRODUCTS = [...Products, ...ElectronicProducts];

export async function seedProducts(trx: Knex.Transaction, ctx: SeedContext) {
  let timestampOffset = 0;

  const getTimestamp = () => {
    const timestamp = new Date(Date.now() - timestampOffset * 1000);
    timestampOffset += TIMESTAMP_OFFSET_SECONDS;
    return timestamp;
  };

  // Load option presets and their values
  const optionPresets = await trx<OptionPresetTable>(Tables.OptionPreset)
    .where({ shop_id: ctx.shopId })
    .select('*');

  const presetValuesMap = new Map<string, Map<string, string>>(); // preset name -> (value name -> value preset id)

  for (const preset of optionPresets) {
    const presetValues = await trx<OptionValuePresetTable>(Tables.OptionValuePreset)
      .where({ option_preset_id: preset.id })
      .select('*');

    const valuesMap = new Map<string, string>();
    presetValues.forEach(pv => {
      valuesMap.set(pv.name, pv.id);
    });

    presetValuesMap.set(preset.name, valuesMap);
  }

  for (const product of ALL_PRODUCTS) {
    // Calculate min and max sale prices from variants (convert to cents)
    const salePrices = product.variants.map(v => v.salePrice);
    const minSalePrice = Math.min(...salePrices);
    const maxSalePrice = Math.max(...salePrices);

    // 1. Create product
    const productTimestamp = getTimestamp();
    const [productCreated] = await trx<ProductTable>(Tables.Product)
      .insert({
        name: product.name,
        slug: product.slug,
        description: product.description,
        enabled: product.enabled,
        archived: product.archived,
        min_sale_price: LunePrice.toCent(minSalePrice),
        max_sale_price: LunePrice.toCent(maxSalePrice),
        shop_id: ctx.shopId,
        created_at: productTimestamp,
        updated_at: productTimestamp
      })
      .returning('id');

    // 2. Create product assets
    if (product.assets && product.assets.length > 0) {
      for (const asset of product.assets) {
        const assetTimestamp = getTimestamp();
        const [assetCreated] = await trx<AssetTable>(Tables.Asset)
          .insert({
            filename: asset.name,
            ext: asset.type === 'image' ? 'jpg' : asset.type,
            source: asset.source,
            provider_id: asset.providerId,
            mime_type: asset.type === 'image' ? 'image/jpeg' : `application/${asset.type}`,
            shop_id: ctx.shopId,
            created_at: assetTimestamp,
            updated_at: assetTimestamp
          })
          .returning('id');

        await trx<ProductAssetTable>(Tables.ProductAsset).insert({
          product_id: productCreated.id,
          asset_id: assetCreated.id,
          order: asset.order
        });
      }
    }

    // 3. Create options and option values
    const optionMap = new Map<string, string>(); // option name -> option id
    const optionValueMap = new Map<string, string>(); // option value name -> option value id

    for (const option of product.options) {
      // Determine if this option should use presets
      const presetValues = presetValuesMap.get(option.name);
      const shouldUsePreset = presetValues && option.values.every(v => presetValues.has(v.name));

      // Create option
      const optionTimestamp = getTimestamp();
      const [optionCreated] = await trx<OptionTable>(Tables.Option)
        .insert({
          name: option.name,
          order: option.order,
          shop_id: ctx.shopId,
          product_id: productCreated.id,
          created_at: optionTimestamp,
          updated_at: optionTimestamp
        })
        .returning('id');

      optionMap.set(option.name, optionCreated.id);

      // Create option values FIRST
      for (const value of option.values) {
        const optionValueTimestamp = getTimestamp();

        // Get preset value ID if using preset
        const presetValueId = shouldUsePreset ? presetValues?.get(value.name) : undefined;

        const [optionValueCreated] = await trx<OptionValueTable>(Tables.OptionValue)
          .insert({
            name: shouldUsePreset ? null : value.name,
            order: value.order,
            option_value_preset_id: presetValueId,
            option_id: optionCreated.id,
            shop_id: ctx.shopId,
            created_at: optionValueTimestamp,
            updated_at: optionValueTimestamp
          })
          .returning('id');

        optionValueMap.set(value.name, optionValueCreated.id);
      }
    }

    // 4. Create variants
    for (const variant of product.variants) {
      const variantTimestamp = getTimestamp();
      const [variantCreated] = await trx<VariantTable>(Tables.Variant)
        .insert({
          sale_price: LunePrice.toCent(variant.salePrice),
          comparison_price: variant.comparisonPrice
            ? LunePrice.toCent(variant.comparisonPrice)
            : null,
          cost_per_unit: variant.costPerUnit ? LunePrice.toCent(variant.costPerUnit) : null,
          stock: variant.stock,
          sku: variant.sku || null,
          requires_shipping: variant.requiresShipping,
          weight: variant.weight || null,
          dimensions: variant.dimensions || null,
          product_id: productCreated.id,
          shop_id: ctx.shopId,
          created_at: variantTimestamp,
          updated_at: variantTimestamp
        })
        .returning('id');

      // Create variant-option-value relationships
      for (const optionValueName of variant.optionValues) {
        const optionValueId = optionValueMap.get(optionValueName);
        if (!optionValueId) {
          throw new Error(`Option value "${optionValueName}" not found`);
        }

        await trx<VariantOptionValueTable>(Tables.VariantOptionValue).insert({
          variant_id: variantCreated.id,
          option_value_id: optionValueId
        });
      }
    }
  }

  LuneLogger.info(`Products inserted: ${ALL_PRODUCTS.length}`);
}
