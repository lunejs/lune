import type { LuneEntity, LuneTable } from './entity';

// TODO: convert keys to PascalCase
export enum AssetType {
  IMG = 'IMG',
  FILE = 'FILE'
}

/**
 * Represents a file or media asset such as an image, PDF, etc.
 */
export interface Asset extends LuneEntity {
  /**
   * Asset's name
   */
  name: string;
  /**
   * Asset's source URL or path
   */
  source: string;
  /**
   * Asset's provider-specific ID
   */
  providerId: string;
  /**
   * Asset type
   */
  type: AssetType;
}

export interface AssetTable extends LuneTable {
  name: string;
  source: string;
  provider_id: string;
  type: string;
  shop_id: string;
}
