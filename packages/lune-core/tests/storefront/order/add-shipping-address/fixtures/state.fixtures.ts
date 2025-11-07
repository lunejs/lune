import type { StateTable } from '@/persistence/entities/state';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestHelper } from '@/tests/utils/test-helper';

import { CountryConstants } from './country.fixtures';

export const StateConstants = {
  // Mexico State IDs
  MxAguascalientesID: TestHelper.generateUUID(),
  MxBajaCaliforniaID: TestHelper.generateUUID(),
  MxBajaCaliforniaSurID: TestHelper.generateUUID(),
  MxCampecheID: TestHelper.generateUUID(),
  MxChiapasID: TestHelper.generateUUID(),
  MxChihuahuaID: TestHelper.generateUUID(),
  MxCoahuilaID: TestHelper.generateUUID(),
  MxColimaID: TestHelper.generateUUID(),
  MxCiudadDeMexicoID: TestHelper.generateUUID(),
  MxDurangoID: TestHelper.generateUUID(),
  MxGuanajuatoID: TestHelper.generateUUID(),
  MxGuerreroID: TestHelper.generateUUID(),
  MxHidalgoID: TestHelper.generateUUID(),
  MxJaliscoID: TestHelper.generateUUID(),
  MxMexicoID: TestHelper.generateUUID(),
  MxMichoacanID: TestHelper.generateUUID(),
  MxMorelosID: TestHelper.generateUUID(),
  MxNayaritID: TestHelper.generateUUID(),
  MxNuevoLeonID: TestHelper.generateUUID(),
  MxOaxacaID: TestHelper.generateUUID(),
  MxPueblaID: TestHelper.generateUUID(),
  MxQueretaroID: TestHelper.generateUUID(),
  MxQuintanaRooID: TestHelper.generateUUID(),
  MxSanLuisPotosiID: TestHelper.generateUUID(),
  MxSinaloaID: TestHelper.generateUUID(),
  MxSonoraID: TestHelper.generateUUID(),
  MxTabascoID: TestHelper.generateUUID(),
  MxTamaulipasID: TestHelper.generateUUID(),
  MxTlaxcalaID: TestHelper.generateUUID(),
  MxVeracruzID: TestHelper.generateUUID(),
  MxYucatanID: TestHelper.generateUUID(),
  MxZacatecasID: TestHelper.generateUUID(),

  // Mexico State Codes
  MxAguascalientesCode: 'AGU',
  MxBajaCaliforniaCode: 'BCN',
  MxBajaCaliforniaSurCode: 'BCS',
  MxCampecheCode: 'CAM',
  MxChiapasCode: 'CHP',
  MxChihuahuaCode: 'CHH',
  MxCoahuilaCode: 'COA',
  MxColimaCode: 'COL',
  MxCiudadDeMexicoCode: 'CMX',
  MxDurangoCode: 'DUR',
  MxGuanajuatoCode: 'GUA',
  MxGuerreroCode: 'GRO',
  MxHidalgoCode: 'HID',
  MxJaliscoCode: 'JAL',
  MxMexicoCode: 'MEX',
  MxMichoacanCode: 'MIC',
  MxMorelosCode: 'MOR',
  MxNayaritCode: 'NAY',
  MxNuevoLeonCode: 'NLE',
  MxOaxacaCode: 'OAX',
  MxPueblaCode: 'PUE',
  MxQueretaroCode: 'QUE',
  MxQuintanaRooCode: 'ROO',
  MxSanLuisPotosiCode: 'SLP',
  MxSinaloaCode: 'SIN',
  MxSonoraCode: 'SON',
  MxTabascoCode: 'TAB',
  MxTamaulipasCode: 'TAM',
  MxTlaxcalaCode: 'TLA',
  MxVeracruzCode: 'VER',
  MxYucatanCode: 'YUC',
  MxZacatecasCode: 'ZAC',

  // United States State IDs
  UsAlabamaID: TestHelper.generateUUID(),
  UsAlaskaID: TestHelper.generateUUID(),
  UsArizonaID: TestHelper.generateUUID(),
  UsArkansasID: TestHelper.generateUUID(),
  UsCaliforniaID: TestHelper.generateUUID(),
  UsColoradoID: TestHelper.generateUUID(),
  UsConnecticutID: TestHelper.generateUUID(),
  UsDelawareID: TestHelper.generateUUID(),
  UsFloridaID: TestHelper.generateUUID(),
  UsGeorgiaID: TestHelper.generateUUID(),
  UsHawaiiID: TestHelper.generateUUID(),
  UsIdahoID: TestHelper.generateUUID(),
  UsIllinoisID: TestHelper.generateUUID(),
  UsIndianaID: TestHelper.generateUUID(),
  UsIowaID: TestHelper.generateUUID(),
  UsKansasID: TestHelper.generateUUID(),
  UsKentuckyID: TestHelper.generateUUID(),
  UsLouisianaID: TestHelper.generateUUID(),
  UsMaineID: TestHelper.generateUUID(),
  UsMarylandID: TestHelper.generateUUID(),
  UsMassachusettsID: TestHelper.generateUUID(),
  UsMichiganID: TestHelper.generateUUID(),
  UsMinnesotaID: TestHelper.generateUUID(),
  UsMississippiID: TestHelper.generateUUID(),
  UsMissouriID: TestHelper.generateUUID(),
  UsMontanaID: TestHelper.generateUUID(),
  UsNebraskaID: TestHelper.generateUUID(),
  UsNevadaID: TestHelper.generateUUID(),
  UsNewHampshireID: TestHelper.generateUUID(),
  UsNewJerseyID: TestHelper.generateUUID(),
  UsNewMexicoID: TestHelper.generateUUID(),
  UsNewYorkID: TestHelper.generateUUID(),
  UsNorthCarolinaID: TestHelper.generateUUID(),
  UsNorthDakotaID: TestHelper.generateUUID(),
  UsOhioID: TestHelper.generateUUID(),
  UsOklahomaID: TestHelper.generateUUID(),
  UsOregonID: TestHelper.generateUUID(),
  UsPennsylvaniaID: TestHelper.generateUUID(),
  UsRhodeIslandID: TestHelper.generateUUID(),
  UsSouthCarolinaID: TestHelper.generateUUID(),
  UsSouthDakotaID: TestHelper.generateUUID(),
  UsTennesseeID: TestHelper.generateUUID(),
  UsTexasID: TestHelper.generateUUID(),
  UsUtahID: TestHelper.generateUUID(),
  UsVermontID: TestHelper.generateUUID(),
  UsVirginiaID: TestHelper.generateUUID(),
  UsWashingtonID: TestHelper.generateUUID(),
  UsWestVirginiaID: TestHelper.generateUUID(),
  UsWisconsinID: TestHelper.generateUUID(),
  UsWyomingID: TestHelper.generateUUID(),

  // United States State Codes
  UsAlabamaCode: 'AL',
  UsAlaskaCode: 'AK',
  UsArizonaCode: 'AZ',
  UsArkansasCode: 'AR',
  UsCaliforniaCode: 'CA',
  UsColoradoCode: 'CO',
  UsConnecticutCode: 'CT',
  UsDelawareCode: 'DE',
  UsFloridaCode: 'FL',
  UsGeorgiaCode: 'GA',
  UsHawaiiCode: 'HI',
  UsIdahoCode: 'ID',
  UsIllinoisCode: 'IL',
  UsIndianaCode: 'IN',
  UsIowaCode: 'IA',
  UsKansasCode: 'KS',
  UsKentuckyCode: 'KY',
  UsLouisianaCode: 'LA',
  UsMaineCode: 'ME',
  UsMarylandCode: 'MD',
  UsMassachusettsCode: 'MA',
  UsMichiganCode: 'MI',
  UsMinnesotaCode: 'MN',
  UsMississippiCode: 'MS',
  UsMissouriCode: 'MO',
  UsMontanaCode: 'MT',
  UsNebraskaCode: 'NE',
  UsNevadaCode: 'NV',
  UsNewHampshireCode: 'NH',
  UsNewJerseyCode: 'NJ',
  UsNewMexicoCode: 'NM',
  UsNewYorkCode: 'NY',
  UsNorthCarolinaCode: 'NC',
  UsNorthDakotaCode: 'ND',
  UsOhioCode: 'OH',
  UsOklahomaCode: 'OK',
  UsOregonCode: 'OR',
  UsPennsylvaniaCode: 'PA',
  UsRhodeIslandCode: 'RI',
  UsSouthCarolinaCode: 'SC',
  UsSouthDakotaCode: 'SD',
  UsTennesseeCode: 'TN',
  UsTexasCode: 'TX',
  UsUtahCode: 'UT',
  UsVermontCode: 'VT',
  UsVirginiaCode: 'VA',
  UsWashingtonCode: 'WA',
  UsWestVirginiaCode: 'WV',
  UsWisconsinCode: 'WI',
  UsWyomingCode: 'WY'
};

export class StateFixtures implements Fixture<StateTable> {
  table: Tables = Tables.State;

  async build(): Promise<Partial<StateTable>[]> {
    return [
      // Mexico States
      {
        id: StateConstants.MxAguascalientesID,
        name: 'Aguascalientes',
        code: StateConstants.MxAguascalientesCode,
        country_id: CountryConstants.MxID
      },
      {
        id: StateConstants.MxBajaCaliforniaID,
        name: 'Baja California',
        code: StateConstants.MxBajaCaliforniaCode,
        country_id: CountryConstants.MxID
      },
      {
        id: StateConstants.MxBajaCaliforniaSurID,
        name: 'Baja California Sur',
        code: StateConstants.MxBajaCaliforniaSurCode,
        country_id: CountryConstants.MxID
      },
      {
        id: StateConstants.MxCampecheID,
        name: 'Campeche',
        code: StateConstants.MxCampecheCode,
        country_id: CountryConstants.MxID
      },
      {
        id: StateConstants.MxChiapasID,
        name: 'Chiapas',
        code: StateConstants.MxChiapasCode,
        country_id: CountryConstants.MxID
      },
      {
        id: StateConstants.MxChihuahuaID,
        name: 'Chihuahua',
        code: StateConstants.MxChihuahuaCode,
        country_id: CountryConstants.MxID
      },
      {
        id: StateConstants.MxCoahuilaID,
        name: 'Coahuila',
        code: StateConstants.MxCoahuilaCode,
        country_id: CountryConstants.MxID
      },
      {
        id: StateConstants.MxColimaID,
        name: 'Colima',
        code: StateConstants.MxColimaCode,
        country_id: CountryConstants.MxID
      },
      {
        id: StateConstants.MxCiudadDeMexicoID,
        name: 'Ciudad de Mexico',
        code: StateConstants.MxCiudadDeMexicoCode,
        country_id: CountryConstants.MxID
      },
      {
        id: StateConstants.MxDurangoID,
        name: 'Durango',
        code: StateConstants.MxDurangoCode,
        country_id: CountryConstants.MxID
      },
      {
        id: StateConstants.MxGuanajuatoID,
        name: 'Guanajuato',
        code: StateConstants.MxGuanajuatoCode,
        country_id: CountryConstants.MxID
      },
      {
        id: StateConstants.MxGuerreroID,
        name: 'Guerrero',
        code: StateConstants.MxGuerreroCode,
        country_id: CountryConstants.MxID
      },
      {
        id: StateConstants.MxHidalgoID,
        name: 'Hidalgo',
        code: StateConstants.MxHidalgoCode,
        country_id: CountryConstants.MxID
      },
      {
        id: StateConstants.MxJaliscoID,
        name: 'Jalisco',
        code: StateConstants.MxJaliscoCode,
        country_id: CountryConstants.MxID
      },
      {
        id: StateConstants.MxMexicoID,
        name: 'Mexico',
        code: StateConstants.MxMexicoCode,
        country_id: CountryConstants.MxID
      },
      {
        id: StateConstants.MxMichoacanID,
        name: 'Michoacan',
        code: StateConstants.MxMichoacanCode,
        country_id: CountryConstants.MxID
      },
      {
        id: StateConstants.MxMorelosID,
        name: 'Morelos',
        code: StateConstants.MxMorelosCode,
        country_id: CountryConstants.MxID
      },
      {
        id: StateConstants.MxNayaritID,
        name: 'Nayarit',
        code: StateConstants.MxNayaritCode,
        country_id: CountryConstants.MxID
      },
      {
        id: StateConstants.MxNuevoLeonID,
        name: 'Nuevo Leon',
        code: StateConstants.MxNuevoLeonCode,
        country_id: CountryConstants.MxID
      },
      {
        id: StateConstants.MxOaxacaID,
        name: 'Oaxaca',
        code: StateConstants.MxOaxacaCode,
        country_id: CountryConstants.MxID
      },
      {
        id: StateConstants.MxPueblaID,
        name: 'Puebla',
        code: StateConstants.MxPueblaCode,
        country_id: CountryConstants.MxID
      },
      {
        id: StateConstants.MxQueretaroID,
        name: 'Queretaro',
        code: StateConstants.MxQueretaroCode,
        country_id: CountryConstants.MxID
      },
      {
        id: StateConstants.MxQuintanaRooID,
        name: 'Quintana Roo',
        code: StateConstants.MxQuintanaRooCode,
        country_id: CountryConstants.MxID
      },
      {
        id: StateConstants.MxSanLuisPotosiID,
        name: 'San Luis Potosi',
        code: StateConstants.MxSanLuisPotosiCode,
        country_id: CountryConstants.MxID
      },
      {
        id: StateConstants.MxSinaloaID,
        name: 'Sinaloa',
        code: StateConstants.MxSinaloaCode,
        country_id: CountryConstants.MxID
      },
      {
        id: StateConstants.MxSonoraID,
        name: 'Sonora',
        code: StateConstants.MxSonoraCode,
        country_id: CountryConstants.MxID
      },
      {
        id: StateConstants.MxTabascoID,
        name: 'Tabasco',
        code: StateConstants.MxTabascoCode,
        country_id: CountryConstants.MxID
      },
      {
        id: StateConstants.MxTamaulipasID,
        name: 'Tamaulipas',
        code: StateConstants.MxTamaulipasCode,
        country_id: CountryConstants.MxID
      },
      {
        id: StateConstants.MxTlaxcalaID,
        name: 'Tlaxcala',
        code: StateConstants.MxTlaxcalaCode,
        country_id: CountryConstants.MxID
      },
      {
        id: StateConstants.MxVeracruzID,
        name: 'Veracruz',
        code: StateConstants.MxVeracruzCode,
        country_id: CountryConstants.MxID
      },
      {
        id: StateConstants.MxYucatanID,
        name: 'Yucatan',
        code: StateConstants.MxYucatanCode,
        country_id: CountryConstants.MxID
      },
      {
        id: StateConstants.MxZacatecasID,
        name: 'Zacatecas',
        code: StateConstants.MxZacatecasCode,
        country_id: CountryConstants.MxID
      },

      // United States States
      {
        id: StateConstants.UsAlabamaID,
        name: 'Alabama',
        code: StateConstants.UsAlabamaCode,
        country_id: CountryConstants.UsID
      },
      {
        id: StateConstants.UsAlaskaID,
        name: 'Alaska',
        code: StateConstants.UsAlaskaCode,
        country_id: CountryConstants.UsID
      },
      {
        id: StateConstants.UsArizonaID,
        name: 'Arizona',
        code: StateConstants.UsArizonaCode,
        country_id: CountryConstants.UsID
      },
      {
        id: StateConstants.UsArkansasID,
        name: 'Arkansas',
        code: StateConstants.UsArkansasCode,
        country_id: CountryConstants.UsID
      },
      {
        id: StateConstants.UsCaliforniaID,
        name: 'California',
        code: StateConstants.UsCaliforniaCode,
        country_id: CountryConstants.UsID
      },
      {
        id: StateConstants.UsColoradoID,
        name: 'Colorado',
        code: StateConstants.UsColoradoCode,
        country_id: CountryConstants.UsID
      },
      {
        id: StateConstants.UsConnecticutID,
        name: 'Connecticut',
        code: StateConstants.UsConnecticutCode,
        country_id: CountryConstants.UsID
      },
      {
        id: StateConstants.UsDelawareID,
        name: 'Delaware',
        code: StateConstants.UsDelawareCode,
        country_id: CountryConstants.UsID
      },
      {
        id: StateConstants.UsFloridaID,
        name: 'Florida',
        code: StateConstants.UsFloridaCode,
        country_id: CountryConstants.UsID
      },
      {
        id: StateConstants.UsGeorgiaID,
        name: 'Georgia',
        code: StateConstants.UsGeorgiaCode,
        country_id: CountryConstants.UsID
      },
      {
        id: StateConstants.UsHawaiiID,
        name: 'Hawaii',
        code: StateConstants.UsHawaiiCode,
        country_id: CountryConstants.UsID
      },
      {
        id: StateConstants.UsIdahoID,
        name: 'Idaho',
        code: StateConstants.UsIdahoCode,
        country_id: CountryConstants.UsID
      },
      {
        id: StateConstants.UsIllinoisID,
        name: 'Illinois',
        code: StateConstants.UsIllinoisCode,
        country_id: CountryConstants.UsID
      },
      {
        id: StateConstants.UsIndianaID,
        name: 'Indiana',
        code: StateConstants.UsIndianaCode,
        country_id: CountryConstants.UsID
      },
      {
        id: StateConstants.UsIowaID,
        name: 'Iowa',
        code: StateConstants.UsIowaCode,
        country_id: CountryConstants.UsID
      },
      {
        id: StateConstants.UsKansasID,
        name: 'Kansas',
        code: StateConstants.UsKansasCode,
        country_id: CountryConstants.UsID
      },
      {
        id: StateConstants.UsKentuckyID,
        name: 'Kentucky',
        code: StateConstants.UsKentuckyCode,
        country_id: CountryConstants.UsID
      },
      {
        id: StateConstants.UsLouisianaID,
        name: 'Louisiana',
        code: StateConstants.UsLouisianaCode,
        country_id: CountryConstants.UsID
      },
      {
        id: StateConstants.UsMaineID,
        name: 'Maine',
        code: StateConstants.UsMaineCode,
        country_id: CountryConstants.UsID
      },
      {
        id: StateConstants.UsMarylandID,
        name: 'Maryland',
        code: StateConstants.UsMarylandCode,
        country_id: CountryConstants.UsID
      },
      {
        id: StateConstants.UsMassachusettsID,
        name: 'Massachusetts',
        code: StateConstants.UsMassachusettsCode,
        country_id: CountryConstants.UsID
      },
      {
        id: StateConstants.UsMichiganID,
        name: 'Michigan',
        code: StateConstants.UsMichiganCode,
        country_id: CountryConstants.UsID
      },
      {
        id: StateConstants.UsMinnesotaID,
        name: 'Minnesota',
        code: StateConstants.UsMinnesotaCode,
        country_id: CountryConstants.UsID
      },
      {
        id: StateConstants.UsMississippiID,
        name: 'Mississippi',
        code: StateConstants.UsMississippiCode,
        country_id: CountryConstants.UsID
      },
      {
        id: StateConstants.UsMissouriID,
        name: 'Missouri',
        code: StateConstants.UsMissouriCode,
        country_id: CountryConstants.UsID
      },
      {
        id: StateConstants.UsMontanaID,
        name: 'Montana',
        code: StateConstants.UsMontanaCode,
        country_id: CountryConstants.UsID
      },
      {
        id: StateConstants.UsNebraskaID,
        name: 'Nebraska',
        code: StateConstants.UsNebraskaCode,
        country_id: CountryConstants.UsID
      },
      {
        id: StateConstants.UsNevadaID,
        name: 'Nevada',
        code: StateConstants.UsNevadaCode,
        country_id: CountryConstants.UsID
      },
      {
        id: StateConstants.UsNewHampshireID,
        name: 'New Hampshire',
        code: StateConstants.UsNewHampshireCode,
        country_id: CountryConstants.UsID
      },
      {
        id: StateConstants.UsNewJerseyID,
        name: 'New Jersey',
        code: StateConstants.UsNewJerseyCode,
        country_id: CountryConstants.UsID
      },
      {
        id: StateConstants.UsNewMexicoID,
        name: 'New Mexico',
        code: StateConstants.UsNewMexicoCode,
        country_id: CountryConstants.UsID
      },
      {
        id: StateConstants.UsNewYorkID,
        name: 'New York',
        code: StateConstants.UsNewYorkCode,
        country_id: CountryConstants.UsID
      },
      {
        id: StateConstants.UsNorthCarolinaID,
        name: 'North Carolina',
        code: StateConstants.UsNorthCarolinaCode,
        country_id: CountryConstants.UsID
      },
      {
        id: StateConstants.UsNorthDakotaID,
        name: 'North Dakota',
        code: StateConstants.UsNorthDakotaCode,
        country_id: CountryConstants.UsID
      },
      {
        id: StateConstants.UsOhioID,
        name: 'Ohio',
        code: StateConstants.UsOhioCode,
        country_id: CountryConstants.UsID
      },
      {
        id: StateConstants.UsOklahomaID,
        name: 'Oklahoma',
        code: StateConstants.UsOklahomaCode,
        country_id: CountryConstants.UsID
      },
      {
        id: StateConstants.UsOregonID,
        name: 'Oregon',
        code: StateConstants.UsOregonCode,
        country_id: CountryConstants.UsID
      },
      {
        id: StateConstants.UsPennsylvaniaID,
        name: 'Pennsylvania',
        code: StateConstants.UsPennsylvaniaCode,
        country_id: CountryConstants.UsID
      },
      {
        id: StateConstants.UsRhodeIslandID,
        name: 'Rhode Island',
        code: StateConstants.UsRhodeIslandCode,
        country_id: CountryConstants.UsID
      },
      {
        id: StateConstants.UsSouthCarolinaID,
        name: 'South Carolina',
        code: StateConstants.UsSouthCarolinaCode,
        country_id: CountryConstants.UsID
      },
      {
        id: StateConstants.UsSouthDakotaID,
        name: 'South Dakota',
        code: StateConstants.UsSouthDakotaCode,
        country_id: CountryConstants.UsID
      },
      {
        id: StateConstants.UsTennesseeID,
        name: 'Tennessee',
        code: StateConstants.UsTennesseeCode,
        country_id: CountryConstants.UsID
      },
      {
        id: StateConstants.UsTexasID,
        name: 'Texas',
        code: StateConstants.UsTexasCode,
        country_id: CountryConstants.UsID
      },
      {
        id: StateConstants.UsUtahID,
        name: 'Utah',
        code: StateConstants.UsUtahCode,
        country_id: CountryConstants.UsID
      },
      {
        id: StateConstants.UsVermontID,
        name: 'Vermont',
        code: StateConstants.UsVermontCode,
        country_id: CountryConstants.UsID
      },
      {
        id: StateConstants.UsVirginiaID,
        name: 'Virginia',
        code: StateConstants.UsVirginiaCode,
        country_id: CountryConstants.UsID
      },
      {
        id: StateConstants.UsWashingtonID,
        name: 'Washington',
        code: StateConstants.UsWashingtonCode,
        country_id: CountryConstants.UsID
      },
      {
        id: StateConstants.UsWestVirginiaID,
        name: 'West Virginia',
        code: StateConstants.UsWestVirginiaCode,
        country_id: CountryConstants.UsID
      },
      {
        id: StateConstants.UsWisconsinID,
        name: 'Wisconsin',
        code: StateConstants.UsWisconsinCode,
        country_id: CountryConstants.UsID
      },
      {
        id: StateConstants.UsWyomingID,
        name: 'Wyoming',
        code: StateConstants.UsWyomingCode,
        country_id: CountryConstants.UsID
      }
    ];
  }
}
