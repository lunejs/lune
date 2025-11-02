import type { LuneEntity, LuneTable } from './entity';

/**
 * A state is a Geographical Region in a country.
 */
export interface State extends LuneEntity {
  /**
   * The state's name
   */
  name: string;
  /**
   * The state's code (e.g., 'JAL', 'CA', 'TX')
   */
  code: string;
  /**
   * The country this state belongs to
   */
  countryId: string;
}

export interface StateTable extends LuneTable {
  name: string;
  code: string;
  country_id: string;
}
