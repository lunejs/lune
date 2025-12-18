import type { Transaction } from '@/persistence/connection/connection';
import type { State, StateTable } from '@/persistence/entities/state';
import { StateSerializer } from '@/persistence/serializers/state.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';

export class StateRepository extends Repository<State, StateTable> {
  constructor(trx: Transaction) {
    super(Tables.State, trx, new StateSerializer());
  }
}
