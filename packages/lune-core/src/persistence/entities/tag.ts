import type { LuneEntity, LuneTable } from './entity';

/**
 * A tag is an arbitrary label which can be applied to certain entities.
 * It is used to help organize and filter those entities.
 */
export interface Tag extends LuneEntity {
  /**
   * The tag's name.
   */
  name: string;
}

export interface TagTable extends LuneTable {
  name: string;
  shop_id: string;
}
