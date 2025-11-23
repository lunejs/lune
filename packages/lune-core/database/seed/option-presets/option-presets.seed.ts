import type { Knex } from 'knex';

import { LuneLogger } from '@/logger/lune.logger';
import { Tables } from '@/persistence/tables';
import type { OptionPresetTable } from '@/persistence/entities/option-preset';
import type { OptionValuePresetTable } from '@/persistence/entities/option-value-preset';
import type { SeedContext } from '../seed.types';

import OptionPresets from './option-presets.json';

const TIMESTAMP_OFFSET_SECONDS = 10;

export async function seedOptionPresets(trx: Knex.Transaction, ctx: SeedContext) {
  let timestampOffset = 0;

  const getTimestamp = () => {
    const timestamp = new Date(Date.now() - timestampOffset * 1000);
    timestampOffset += TIMESTAMP_OFFSET_SECONDS;
    return timestamp;
  };

  for (const preset of OptionPresets) {
    // 1. Create option preset
    const presetTimestamp = getTimestamp();
    const [presetCreated] = await trx<OptionPresetTable>(Tables.OptionPreset)
      .insert({
        name: preset.name,
        shop_id: ctx.shopId,
        created_at: presetTimestamp,
        updated_at: presetTimestamp
      })
      .returning('id');

    // 2. Create option value presets
    for (const value of preset.values) {
      const valueTimestamp = getTimestamp();
      await trx<OptionValuePresetTable>(Tables.OptionValuePreset).insert({
        name: value.name,
        metadata: value.metadata,
        option_preset_id: presetCreated.id,
        shop_id: ctx.shopId,
        created_at: valueTimestamp,
        updated_at: valueTimestamp
      });
    }
  }

  LuneLogger.info(`Option presets inserted: ${OptionPresets.length}`);
}
