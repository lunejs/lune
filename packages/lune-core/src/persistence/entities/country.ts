import type { LuneEntity, LuneTable } from './entity';

/**
 * A country is a representation of a country in the world.
 * Indicating where shops can deliver their products
 */
export interface Country extends LuneEntity {
  /**
   * The country's name
   */
  name: string;
  /**
   * The country's ISO 3166-1 alpha-2 code (e.g., 'MX', 'US', 'CA')
   */
  code: string;
}

export interface CountryTable extends LuneTable {
  name: string;
  code: string;
}
