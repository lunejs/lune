import type { Asset, AssetTable } from '../entities/asset';

import { Serializer } from './serializer';

export class AssetSerializer extends Serializer<Asset, AssetTable> {
  constructor() {
    super([
      ['id', 'id'],
      ['created_at', 'createdAt'],
      ['updated_at', 'updatedAt'],
      ['name', 'name'],
      ['source', 'source'],
      ['provider_id', 'providerId'],
      ['type', 'type']
    ]);
  }
}
