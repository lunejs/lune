import type { LuneEntity, LuneTable } from './entity';

/**
 * Represents a file or media asset such as an image, PDF, etc.
 */
export interface Asset extends LuneEntity {
  /**
   * Asset's name
   */
  filename: string;
  /**
   * Asset's extension file
   */
  ext: string;
  /**
   * Asset's source URL or path
   */
  source: string;
  /**
   * Asset's provider-specific ID
   */
  providerId: string;
  /**
   * Asset mime type
   */
  mimeType: string;
  /**
   * Asset size
   */
  size: number;
}

export interface AssetTable extends LuneTable {
  filename: string;
  ext: string;
  source: string;
  provider_id: string;
  mime_type: string;
  shop_id: string;
}
