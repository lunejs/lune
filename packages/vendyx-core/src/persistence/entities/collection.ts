import type { VendyxEntity, VendyxTable } from './entity';

export enum CollectionContentType {
  Products = 'PRODUCTS',
  Collection = 'COLLECTIONS'
}

/**
 * A collection is a group of products that are displayed together in the storefront.
 */
export interface Collection extends VendyxEntity {
  /**
   * The collection's name
   */
  name: string;
  /**
   * The collection's slug used in the URL
   */
  slug: string;
  /**
   * The collection's description
   */
  description?: string | null;
  /**
   * Whether the collection is enabled or not.
   * Not enabled collections are not exposed to the storefront API but are visible in the admin ui.
   * Useful for collections that are not published by now but they planned to be published in the future.
   */
  enabled: boolean;
  /**
   * Collection's content type
   * indicating if the collection contains products or other collections
   */
  contentType: CollectionContentType;
  /**
   * The collection's order
   */
  order: number;
}

export interface CollectionTable extends VendyxTable {
  name: string;
  slug: string;
  description?: string | null;
  enabled: boolean;
  content_type: CollectionContentType;
  order: number;
  shop_id: string;
}
