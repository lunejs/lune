import type { Asset, AssetTable } from '../entities/asset';

import { Serializer } from './serializer';

export class AssetSerializer extends Serializer<Asset, AssetTable> {
  constructor() {
    super([
      ['id', 'id'],
      ['created_at', 'createdAt'],
      ['updated_at', 'updatedAt'],
      ['filename', 'filename'],
      ['ext', 'ext'],
      ['source', 'source'],
      ['provider_id', 'providerId'],
      ['mime_type', 'mimeType']
    ]);
  }
}
