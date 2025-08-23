import { VendyxEntity, VendyxTable } from './entity';

enum AssetType {
  IMG = 'IMG',
  FILE = 'FILE'
}

/**
 * Represents a file or media asset such as an image, PDF, etc.
 */
export interface Asset extends VendyxEntity {
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

export interface AssetTable extends VendyxTable {
  name: string;
  source: string;
  provider_id: string;
  type: string;
  shop_id: string;
}
