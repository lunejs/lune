import DataLoader from 'dataloader';

import type { Transaction } from '@/persistence/connection/connection';
import type { State, StateTable } from '@/persistence/entities/state';
import { StateSerializer } from '@/persistence/serializers/state.serializer';
import { Tables } from '@/persistence/tables';

export function createAddressStateLoader(trx: Transaction) {
  return new DataLoader<string, State>(async stateIds => {
    const serializer = new StateSerializer();
    const rows = await trx<StateTable>(Tables.State).whereIn('id', stateIds).select('*');

    const map = new Map(rows.map(r => [r.id, serializer.deserialize(r) as State]));
    return stateIds.map(id => map.get(id) as State);
  });
}
