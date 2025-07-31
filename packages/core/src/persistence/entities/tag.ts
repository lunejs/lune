import { VendyxEntity, VendyxTable } from './entity';

/**
 * A tag is an arbitrary label which can be applied to certain entities.
 * It is used to help organize and filter those entities.
 */
export interface Tag extends VendyxEntity {
  /**
   * The tag's name.
   */
  name: string;
}

export interface TagTable extends VendyxTable {
  name: string;
}
