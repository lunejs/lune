import DataLoader from 'dataloader';

import type { Transaction } from '@/persistence/connection';
import type { State, StateTable } from '@/persistence/entities/state';
import { StateSerializer } from '@/persistence/serializers/state.serializer';
import { Tables } from '@/persistence/tables';

export function createCountryStatesLoader(trx: Transaction) {
  return new DataLoader<string, State[]>(async countryIds => {
    const rows = await trx<StateTable>(Tables.State)
      .whereIn('country_id', countryIds)
      .orderBy('name', 'desc');

    const serializer = new StateSerializer();

    const byCountryId = new Map<string, State[]>();
    for (const id of countryIds) byCountryId.set(id, []);

    for (const r of rows) {
      const { country_id, ...lineCols } = r;
      const state = serializer.deserialize(lineCols) as State;
      byCountryId.get(country_id)?.push(state);
    }

    return (countryIds as string[]).map(id => byCountryId.get(id) ?? []);
  });
}
